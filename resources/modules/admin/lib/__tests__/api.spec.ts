import apiInstance, { api, retryDefaultConfig } from '../api';
import axios, { AxiosPromise, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { API_PREFIX } from '../../constants';
jest.setTimeout(20000);

describe('Testing api function helper', () => {
  const mockedApiInstance = jest.fn(apiInstance);

  beforeEach(() => {
    mockedApiInstance.mockClear();
  });

  const RETRIES = 3;
  const apiArgs = {
    $propagateReqToStore: false,
    $propagateErrToStore: false,
    $blockUntilResolved: true,
    $retryConfig: <typeof retryDefaultConfig>{
      retries: RETRIES,
      retryDelay: (_: number) => 1000
    },
  };
  const axiosReqConfig: AxiosRequestConfig = {
    url: '/test',
    method: 'GET',
    baseURL: API_PREFIX
  };

  const axiosSuccessResp: AxiosResponse<{ success: boolean }> = {
    data: {
      success: true
    },
    status: 200,
    statusText: 'OK',
    headers: {},
    config: axiosReqConfig,
    request: {}
  };

  const axiosFailedResp: AxiosResponse<{ success: boolean }> = {
    data: {
      success: false
    },
    status: 400,
    statusText: 'Bad Request',
    headers: {},
    config: axiosReqConfig,
    request: {}
  };

  const axiosError: AxiosError = {
    config: axiosReqConfig,
    response: axiosFailedResp,
    name: 'Bad request error',
    message: 'Something went wrong'
  }

  test('should resolve response', async () => {
    const resolvedData = await api({
      ...<any>{ $axiosInstance: mockedApiInstance.mockResolvedValueOnce(axiosSuccessResp) },
      ...apiArgs,
      ...axiosReqConfig
    });
    expect(mockedApiInstance).toHaveBeenCalledTimes(1);
    expect(resolvedData).toStrictEqual(axiosSuccessResp);
  });

  test('should reject response', async () => {
    expect.assertions(1);
    try {
      await api({
        ...<any>{ $axiosInstance: mockedApiInstance.mockRejectedValue(axiosError) },
        ...apiArgs,
        ...axiosReqConfig
      });
    } catch (err) {
      expect(err).toStrictEqual(axiosError);
    }
  });

  test('should resolve response after 2 retries', async () => {
    const result = await api({
      ...<any>{
        $axiosInstance: mockedApiInstance
          .mockRejectedValueOnce(axiosError)
          .mockRejectedValueOnce(axiosError)
          .mockResolvedValueOnce(axiosSuccessResp)
      },
      ...apiArgs,
      ...axiosReqConfig
    });
    expect(mockedApiInstance).toHaveBeenCalledTimes(3);
    expect(result).toStrictEqual(axiosSuccessResp);
  });
});
