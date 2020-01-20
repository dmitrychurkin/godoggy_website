import { Rooms } from "./state";

export default {
  isAccommodationLoaded: ({ isAccommodationLoaded }: Rooms) =>
    isAccommodationLoaded,
  rooms: ({ rooms = [] }: Rooms) => rooms
};
