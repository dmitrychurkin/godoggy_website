import { CancelTokenSource } from "axios";

interface IRequestEntity {
  readonly id: string;
  readonly cancelToken: CancelTokenSource;
  readonly isRetry: boolean;
  timerId?: number;
}

const requests: Array<IRequestEntity> = [];
const state = {
  requests
};

type Requests = typeof state;

export { state as default, Requests, IRequestEntity };
