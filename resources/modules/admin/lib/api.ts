import axios, { AxiosRequestConfig, AxiosInstance, AxiosError, CancelTokenSource, AxiosResponse } from 'axios';
import { Store } from 'vuex';
import store from 'admin/plugins/vuex';
import { SEND_REQUEST, RESOLVE_REQUEST, UPDATE_RETRY_COUNTER } from 'admin/store/mutation-types';
import { API_PREFIX, AUTH_ERROR_CODES } from 'admin/constants';
import { App } from 'admin/store/state';
import { signToken, unSignToken } from './auth-adapter';
// import { setNotification } from './notificator';

const apiInstance = axios.create({
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
});

/*apiInstance.interceptors.request.use(config => {
  const token = store.getters['auth/getToken'];
  if (token) {
    config.headers.common['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));*/

apiInstance.interceptors.response.use(response => {
  const { headers: { authorization } } = response;

  const token = authorization ?
    authorization.split(' ').slice(-1)[0] :
    store.getters['auth/getToken'];
  if (token) {
    signToken(token);
  } else {
    unSignToken();
  }

  return response;
}, error => {
  if (!axios.isCancel(error)) {
    const { status } = error.response;
    if (AUTH_ERROR_CODES.includes(status)) {
      unSignToken();
    }
  }
  return Promise.reject(error);
});

export const retryDefaultConfig: IRetryConfig = {
  retries: Number.POSITIVE_INFINITY,
  isNeedRetry(err: AxiosError, currentRetryCount: number) {
    return ![...AUTH_ERROR_CODES, 404].includes(err.response!.status) &&
      (this.retries >= currentRetryCount);
  },
  retryDelay: (currentRetryCount: number) => 5000,
};

export async function api<T>({
  $store = store,
  $axiosInstance = apiInstance,
  $propagateReqToStore = true,
  $propagateErrToStore = false,
  $cancelTokenSource = axios.CancelToken.source(),
  $requestId = '',
  $blockUntilResolved = false,
  $isRetry = false,
  $auth = false,
  $authToken = null,
  $retryConfig,
  baseURL = API_PREFIX,
  ...requestOptions
}: ApiArgs): Promise<AxiosResponse<T> | undefined> {
  const id = $requestId || idRequestEncoder(requestOptions);
  const isRetry = ($retryConfig instanceof Object) || $isRetry;
  let headersConfig = {};
  const authToken: string = $authToken || ($auth && $store.getters['auth/getToken']) || '';
  if (authToken) {
    headersConfig = {
      headers: {
        ...(requestOptions.headers || {}),
        Authorization: `Bearer ${authToken}`
      }
    };
  }
  const propagateReqToStore = () => {
    if ($propagateReqToStore) {
      const requestEntity: IRequestEntity = {
        id, isRetry, cancelToken: $cancelTokenSource, timerId: 0
      };
      $store.commit(SEND_REQUEST, requestEntity);
    }
  };
  const sendRequest = () =>
    $axiosInstance({
      baseURL,
      cancelToken: $cancelTokenSource.token,
      ...requestOptions,
      ...headersConfig
    });
  const isRequestExists = $store.getters.request(id);

  if (isRetry) {
    if (!isRequestExists) {
      return new Promise((resolve, reject) => {
        propagateReqToStore();
        const retryConfig: IRetryConfig = {
          ...retryDefaultConfig,
          ...($retryConfig instanceof Object ? $retryConfig : {})
        };
        let retryCount = 0;
        const retrySession = async () => {
          try {
            const response = await sendRequest();
            $store.commit(RESOLVE_REQUEST, id);
            resolve(response);
          } catch (err) {
            if (axios.isCancel(err) || !retryConfig.isNeedRetry(err, retryCount)) {
              const request: IRequestEntity = $store.getters.request(id);
              clearTimeout(request.timerId);
              $store.commit(RESOLVE_REQUEST, id);
              /* if ($propagateErrToStore) {
                setNotification({
                  subject: err,
                  type: NotificationLevel.ERROR
                });
              } */
              reject(err);
            } else {
              retryCount += 1;
              const timerId = setTimeout(retrySession, retryConfig.retryDelay(retryCount));
              $store.commit(UPDATE_RETRY_COUNTER, { id, timerId });
            }
          }
        };
        retrySession();
      });
    }
  } else if ($blockUntilResolved && isRequestExists) {
    return;
  } else {
    propagateReqToStore();
    try {
      return (await sendRequest());
    }/*  catch (err) {
      if ($propagateErrToStore) {
        setNotification({
          subject: err,
          type: NotificationLevel.ERROR
        });
      } 
      throw err;
    }*/ finally {
      $store.commit(RESOLVE_REQUEST, id);
    }
  }
}

export function idRequestEncoder({ method = 'get', url }: AxiosRequestConfig) {
  return `${method}:${url}`;
}

export interface ApiInstance<T> {
  (arg: ApiArgs): Promise<AxiosResponse<T>>;
}

export interface IRequestEntity {
  readonly id: string;
  readonly cancelToken: CancelTokenSource;
  readonly isRetry: boolean;
  timerId: number;
}

export interface IRetryConfig {
  readonly retries: number;
  isNeedRetry(err: AxiosError, currentRetryCount: number): boolean;
  retryDelay(currentRetryCount: number): number;
}

type ApiArgs = {
  readonly $store?: Store<App>;
  readonly $axiosInstance?: AxiosInstance;
  readonly $propagateReqToStore?: boolean;
  readonly $propagateErrToStore?: boolean;
  readonly $cancelTokenSource?: CancelTokenSource;
  readonly $requestId?: string;
  readonly $isRetry?: boolean;
  readonly $retryConfig?: IRetryConfig;
  readonly $blockUntilResolved?: boolean;
  readonly $auth?: boolean;
  readonly $authToken?: string | null | undefined;
} & AxiosRequestConfig;

export default apiInstance;