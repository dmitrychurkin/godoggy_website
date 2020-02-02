import { Requests } from "./state";

export default {
  requests: ({ requests }: Requests) => requests,
  request: ({ requests }: Requests) => (id: string) =>
    requests.find(r => r.id === id)
};
