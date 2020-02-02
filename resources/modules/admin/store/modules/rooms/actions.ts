import { App } from "admin/store/state";
import { ActionContext } from "vuex";
import { GET_ACCOMMODATION } from "./action-types";
import {
  ACCOMMODATION_LOADED_FAIL,
  ACCOMMODATION_LOADED_SUCCESS
} from "./mutation-types";

export default {
  [GET_ACCOMMODATION]: async ({ getters, commit }: ActionContext<App, App>) => {
    if (!getters.isAccommodationLoaded) {
      try {
        // const data = await api({
        //   url: CUSTOMIZE_ROUTES.child.ACCOMMODATION.path,
        //   $blockUntilResolved: true,
        //   $auth: true
        // });
        // console.log("Data GET_ACCOMMODATION action => ", data);
        commit(ACCOMMODATION_LOADED_SUCCESS);
      } catch (e) {
        console.log("Error occured GET_ACCOMMODATION action => ");
        console.dir(e);
        commit(ACCOMMODATION_LOADED_FAIL);
      }
    }
  }
};
