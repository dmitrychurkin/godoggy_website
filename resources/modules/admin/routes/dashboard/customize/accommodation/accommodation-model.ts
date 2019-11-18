import { Locales } from "admin/constants";
import { checkValidity, checkOnRequired } from "admin/utils/form-helpers";
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
  category: {
    [locale]: ''
  },
  //images
  // floorPlan
  description: {
    [locale]: ''
  },
  size: {
    value: 0,
    unitSystem: UnitSystems.SQ_M
  },
  count: 1,
  bed: {
    [locale]: [BedTypes.KING, BedTypes.TWIN]
  },
  extraBed: true,
  occupancy: OccupancyTypes.TPL,
  meals: {
    [locale]: [MealTypes.BB, MealTypes.HB, MealTypes.FB]
  },
  roomType: RoomTypes.ROOM,
  roomView: {
    [locale]: []
  },
  bathroom: {
    [locale]: ''
  },
  wifi: true,
  minibar: true,
  safe: true,
  phone: true,
  balcony: false,
  jacuzzi: false,
  satellite: true,
  view: {
    [locale]: ''
  },
  features: {
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
  };
  category.rules = [validationRule(category, 'category')];

  const count: IDataField = {
    // isRequired: true,
    value: data.count // input number
  };
  count.rules = [validationRule(count, 'count')];

  const bed: IDataField = {
    value: [...data.bed[locale]] // combo
  };
  bed.rules = [
    validateCombos(bed, 'bed')
  ];

  const meals: IDataField = {
    value: [...data.meals[locale]] // combo
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
      const el = document.getElementById(id) as (HTMLInputElement | null);
      return Boolean(el) && (el!.validationMessage);
    }
    return false;
  };
}

function validationRule(dataObj: IDataField, id?: string, customValidators?: Function[]) {
  return () => {
    const inputEl = (id ? document.getElementById(id) : null) as (HTMLInputElement | null);
    if (inputEl) {
      return checkValidity(inputEl);
    }
    if (Array.isArray(customValidators)) {
      for (const validator of customValidators) {
        const validationResult = validator(dataObj.value);
        if (typeof validationResult === 'string') {
          return validationResult;
        }
      }
    }
    return checkOnRequired(dataObj.value);
  };
}

interface IDataField {
  value: any;
  rules?: Array<Function>;
}

export interface IFeatureField {
  value: Array<string>;
  activeFeature: { [index: string]: number };
}