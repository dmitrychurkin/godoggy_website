import { showNotification } from "admin/App/common/AppNotificator";
import { API_PREFIX } from "admin/constants";
import store from "admin/plugins/vuex";
import { UNSET_SESSION } from "admin/store/modules/auth/mutation-types";
import {
  INotification,
  NotificationLevel
} from "admin/store/modules/notifications/state";
import {
  RESOLVE_REQUEST,
  SEND_REQUEST,
  UPDATE_RETRY_COUNTER
} from "admin/store/modules/requests/mutation-types";
import { IRequestEntity } from "admin/store/modules/requests/state";
import { App } from "admin/store/state";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource
} from "axios";
import { Store } from "vuex";

const apiInstance = axios.create({
  headers: {
    "X-Requested-With": "XMLHttpRequest"
  }
});

apiInstance.interceptors.response.use(
  res => res,
  err => {
    if (err.response.status === 401) {
      store.commit(UNSET_SESSION);
    }
    return Promise.reject(err);
  }
);

const retryDefaultConfig: IRetryConfig = {
  retries: Number.POSITIVE_INFINITY,
  retryDelay: () => 5000,
  isNeedRetry(err: AxiosError, currentRetryCount: number) {
    return (
      (err.response?.status ?? 0) >= 400 &&
      (this.retries ?? 0) >= currentRetryCount
    );
  }
};

interface IRetryConfig {
  readonly retries?: number;
  isNeedRetry(err: AxiosError, currentRetryCount: number): boolean;
  retryDelay(currentRetryCount?: number): number;
}

export default async function api<T>({
  $requestId,
  $retryConfig,
  $notificationConfig,
  $store = store,
  $axiosInstance = apiInstance,
  $cancelTokenSource = axios.CancelToken.source(),
  $propagateReqToStore = true,
  $blockUntilResolved = true,
  $showNotification = false,
  $retry = false,
  baseURL = API_PREFIX,
  ...requestOptions
}: IConfig & AxiosRequestConfig): Promise<AxiosResponse<T> | undefined> {
  const id = $requestId ?? idRequestEncoder({ baseURL, ...requestOptions });
  const isRetry = Boolean($retryConfig ?? $retry);
  const propagateReqToStore = () => {
    if ($propagateReqToStore) {
      const requestEntity: IRequestEntity = {
        id,
        isRetry,
        cancelToken: $cancelTokenSource
      };
      $store.commit(SEND_REQUEST, requestEntity);
    }
  };
  const sendRequest = () =>
    $axiosInstance({
      baseURL,
      cancelToken: $cancelTokenSource.token,
      ...requestOptions
    });
  const isRequestExists = $store.getters.request(id);
  const notifyIfNeeded = (
    r: AxiosError | AxiosResponse<T>,
    isError = false
  ) => {
    if ($showNotification || Boolean($notificationConfig)) {
      const config = {
        ...($notificationConfig ?? {}),
        ...(isError ? { type: NotificationLevel.ERROR } : {})
      };
      showNotification(config, r);
    }
  };

  if (isRetry && !isRequestExists) {
    return new Promise((resolve, reject) => {
      propagateReqToStore();
      const retryConfig: IRetryConfig = {
        ...retryDefaultConfig,
        ...($retryConfig ?? {})
      };
      let retryCount = 0;
      const retryRequest = async () => {
        try {
          const response = await sendRequest();
          $store.commit(RESOLVE_REQUEST, id);
          notifyIfNeeded(response);
          resolve(response);
        } catch (err) {
          if (
            axios.isCancel(err) ||
            !retryConfig.isNeedRetry(err, retryCount)
          ) {
            const request: IRequestEntity = $store.getters.request(id);
            clearTimeout(request.timerId);
            $store.commit(RESOLVE_REQUEST, id);
            notifyIfNeeded(err, true);
            reject(err);
          } else {
            retryCount += 1;
            const timerId = setTimeout(
              retryRequest,
              retryConfig.retryDelay(retryCount)
            );
            $store.commit(UPDATE_RETRY_COUNTER, { id, timerId });
          }
        }
      };
      retryRequest();
    });
  } else if ($blockUntilResolved && isRequestExists) {
    return;
  }
  propagateReqToStore();
  try {
    const response = await sendRequest();
    notifyIfNeeded(response);
    return response;
  } catch (err) {
    notifyIfNeeded(err, true);
    throw err;
  } finally {
    $store.commit(RESOLVE_REQUEST, id);
  }
}

function idRequestEncoder({ method = "GET", ...rest }: AxiosRequestConfig) {
  return `${method}:${apiInstance.getUri({ method, ...rest })}`;
}

interface IConfig {
  readonly $store?: Store<App>;
  readonly $axiosInstance?: AxiosInstance;
  readonly $propagateReqToStore?: boolean;
  readonly $propagateErrToStore?: boolean;
  readonly $cancelTokenSource?: CancelTokenSource;
  readonly $requestId?: string;
  readonly $retryConfig?: IRetryConfig;
  readonly $retry?: boolean;
  readonly $blockUntilResolved?: boolean;
  readonly $showNotification?: boolean;
  readonly $notificationConfig?: INotification;
}
