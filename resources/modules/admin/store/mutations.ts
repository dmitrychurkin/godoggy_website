import { IS_SHOW_APP_LOADER } from "./mutation-types";
import { App } from "./state";

export default {
  [IS_SHOW_APP_LOADER]: (state: App, isShow = false) => {
    state.isShowAppLoader = isShow;
  }
};
