import {
  ACCOMMODATION_LOADED_SUCCESS,
  ACCOMMODATION_LOADED_FAIL
} from "./mutation-types";
import { Rooms } from "./state";

export default {
  [ACCOMMODATION_LOADED_SUCCESS]: (state: Rooms) => {
    state.isAccommodationLoaded = true;
  },
  [ACCOMMODATION_LOADED_FAIL]: (state: Rooms) => {
    state.isAccommodationLoaded = false;
  }
};
