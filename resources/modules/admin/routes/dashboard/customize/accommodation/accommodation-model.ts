import { Locales } from "admin/constants";
import { formFieldValidator } from "admin/utils/form-helpers";
export const enum UnitSystems {
  SQ_FT,
  SQ_M
};
export const enum MealTypes {
  BB = 'BB',
  HB = 'HB',
  FB = 'FB',
  HB_Plus = 'HB+',
  AI = 'AI'
};
const enum RoomTypes {
  ROOM,
  SUITE
};
const enum RoomViews {
  OCEAN,
  SEA,
  MOUNTAIN,
  LAKE,
  CITY,
  NONE
}
export const enum BedTypes {
  KING = 'KING',
  TWIN = 'TWIN',
  FRENCH = 'FRENCH'
};
export const enum OccupancyTypes {
  SGL = 1,
  DBL,
  TPL,
  QPL
};
export const enum Amenities {
  BATH_PERSONAL_CARE,
  OFFICE_EQUIPMENT_STATIONERY,
  MEDIA_ENTERTAINMENT,
  REFRESHMENTS,
  OTHER
};
const locale: string = Locales.EN;
const initialRoomData = {
  category: { // -> done
    [locale]: ''
  },
  //images
  // floorPlan
  // Room code
  description: { // -> done
    [locale]: ''
  },
  size: { // -> done
    value: 0,
    unitSystem: UnitSystems.SQ_M // refactor to separate field // -> done
  },
  count: 1, // -> done
  bed: { // -> done
    [locale]: [BedTypes.KING, BedTypes.TWIN]
  },
  extraBed: true, // -> done
  occupancy: OccupancyTypes.TPL, // -> done
  meals: { // -> done
    [locale]: [MealTypes.BB, MealTypes.HB, MealTypes.FB]
  },
  roomType: RoomTypes.ROOM, // -> done
  roomView: { // -> done
    [locale]: []
  },
  bathroom: { // -> done
    [locale]: ''
  },
  wifi: true, // -> done
  minibar: true, // -> done
  safe: true, // -> done
  phone: true, // -> done
  balcony: false, // -> done
  jacuzzi: false, // -> done
  satellite: true, // -> done
  view: { // -> done
    [locale]: ''
  },
  features: { // -> done
    [locale]: []
  },
  amenities: {
    bathPersonalCare: {
      [locale]: []
    },
    officeEquipmentStationery: {
      [locale]: []
    },
    mediaEntertainment: {
      [locale]: []
    },
    refreshments: {
      [locale]: []
    },
    other: {
      [locale]: []
    }
  },
  meta: {
    hasLocales: false
  },
};
/**
 * 
 * fields:
 * - category (t)
 * - description (t)
 * - images
 * - count
 * - bed type (t)
 * - occupancy
 * - room type (room, suite)
 * - room size (with selection of unit system)
 * - details with icons / default subtitle (subheader) (t)
 * - features
 *        - special amenities with icons (t) and with sub items see shangrila
 *        - other amenities (t)
 */
export default (locale: Locales, data = initialRoomData) => {
  const category: IDataField = {
    // isRequired: true,
    value: data.category[locale], // input text
    expansionIndex: 0,
    rules: [formFieldValidator('category')]
  };

  const count: IDataField = {
    // isRequired: true,
    value: data.count, // input number
    expansionIndex: 2,
    rules: [formFieldValidator('count')]
  };

  const bed: IDataField = {
    value: [...data.bed[locale]], // combo
    expansionIndex: 4
  };
  bed.rules = [validateCombos(bed, 'bed')];

  const meals: IDataField = {
    value: [...data.meals[locale]], // combo
    expansionIndex: 7
  };
  meals.rules = [
    validateCombos(meals, 'meals')
  ];

  return {
    category,
    description: {
      value: data.description[locale] // textarea
    },
    size: {
      ...data.size // input number / select unit system
    },
    count,
    bed,
    extraBed: {
      value: data.extraBed // radio or switch
    },
    occupancy: {
      value: data.occupancy // slider
    },
    meals,
    roomType: {
      value: data.roomType // radio
    },
    roomView: {
      value: [...data.roomView[locale]] // input text
    },
    bathroom: {
      value: data.bathroom[locale] // input text
    },
    wifi: {
      value: data.wifi // switch
    },
    minibar: {
      value: data.minibar // switch
    },
    safe: {
      value: data.safe // switch
    },
    phone: {
      value: data.phone // switch
    },
    balcony: {
      value: data.balcony // switch
    },
    jacuzzi: {
      value: data.jacuzzi // switch
    },
    satellite: {
      value: data.satellite // switch
    },
    view: {
      value: data.view[locale]
    },
    features: {
      value: [...data.features[locale] as Array<string>],
      activeFeature: {
        [locale]: 0
      }
    },
    amenities: {
      [Amenities.BATH_PERSONAL_CARE]: {
        value: [...data.amenities.bathPersonalCare[locale]],
        activeFeature: {
          [locale]: 0
        }
      },
      [Amenities.OFFICE_EQUIPMENT_STATIONERY]: {
        value: [...data.amenities.officeEquipmentStationery[locale]],
        activeFeature: {
          [locale]: 0
        }
      },
      [Amenities.MEDIA_ENTERTAINMENT]: {
        value: [...data.amenities.mediaEntertainment[locale]],
        activeFeature: {
          [locale]: 0
        }
      },
      [Amenities.REFRESHMENTS]: {
        value: [...data.amenities.refreshments[locale]],
        activeFeature: {
          [locale]: 0
        }
      },
      [Amenities.OTHER]: {
        value: [...data.amenities.other[locale]],
        activeFeature: {
          [locale]: 0
        }
      }
    }
  };
};

function validateCombos(dataObj: IDataField, id: string) {
  return () => {
    if (dataObj.value.length == 0) {
      return formFieldValidator(id)();
    }
    return true;
  };
}

interface IDataField {
  readonly value: any;
  rules?: Array<Function>;
  readonly expansionIndex?: number;
}

export interface IFeatureField {
  readonly value: Array<string>;
  readonly activeFeature: { [index: string]: number };
}