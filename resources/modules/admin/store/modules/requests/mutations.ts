import {
  RESOLVE_REQUEST,
  SEND_REQUEST,
  UPDATE_RETRY_COUNTER
} from "./mutation-types";
import { IRequestEntity, Requests } from "./state";

export default {
  [SEND_REQUEST]: (state: Requests, requestEntity: IRequestEntity) => {
    state.requests = [...state.requests, requestEntity];
  },
  [RESOLVE_REQUEST]: (state: Requests, id: string) => {
    if (id) {
      state.requests = state.requests.filter(r => r.id !== id);
    }
  },
  [UPDATE_RETRY_COUNTER]: (state: Requests, { id, timerId }: IUpdateRetry) => {
    state.requests = state.requests.map(r => {
      if (r.id === id) {
        r.timerId = timerId;
      }
      return r;
    });
  }
};

interface IUpdateRetry {
  readonly id: string;
  readonly timerId: number;
}
