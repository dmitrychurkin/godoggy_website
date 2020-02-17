const CATEGORY_MAX_LENGTH = 1_000;
const DESCRIPTION_MAX_LENGTH = 100_000;
const MAX_COUNT = 1_000_000;
const FEATURE_MAX_LENGTH = 1_000;

export const validationSchema = {
  category: {
    required: true,
    maxlength: CATEGORY_MAX_LENGTH
  },
  description: {
    maxlength: DESCRIPTION_MAX_LENGTH
  },
  count: {
    required: true,
    max: MAX_COUNT,
    min: 1
  },
  size: {
    max: MAX_COUNT,
    min: 1
  },
  bed: {
    required: true
  },
  occupancy: {
    max: 10,
    min: 1
  },
  meals: {
    required: true
  },
  feature: {
    maxlength: FEATURE_MAX_LENGTH
  }
};

export const fieldValidation = (
  id: string,
  validationRules: IValidationRules
) => (payload: number | string | Array<string>) => {
  const el = document.getElementById(id);
  const validationPayload =
    el instanceof HTMLInputElement &&
    (el.checkValidity() || el.validationMessage);
  if (Array.isArray(payload)) {
    if (!payload.length) {
      return typeof validationPayload === "string" && validationPayload;
    }
    return true;
  }
  if (validationPayload === true) {
    const explicitValidatorResult = bypassValidator(payload, validationRules);
    return explicitValidatorResult || validationPayload;
  }
  return validationPayload;
};

const h = (payload: number, max: number, min: number) =>
  payload > max || payload < min;
function bypassValidator(
  payload: number | string | Array<string>,
  {
    required = false,
    maxlength = Infinity,
    minlength = 0,
    max = Infinity,
    min = 0
  }: IValidationRules
) {
  if (required && !String(payload).length) {
    return false;
  }
  if (typeof payload === "number") {
    return !h(payload, max, min);
  }
  if (h(payload.length, maxlength, minlength)) {
    return false;
  }
  return true;
}

export const enum Amenities {
  BATH_PERSONAL_CARE,
  OFFICE_EQUIPMENT_STATIONERY,
  MEDIA_ENTERTAINMENT,
  REFRESHMENTS,
  OTHER
}

interface IValidationRules {
  readonly required?: boolean;
  readonly maxlength?: number;
  readonly minlength?: number;
  readonly max?: number;
  readonly min?: number;
}

export type IFeature = {
  readonly value: Array<string>;
  activeFeature: number;
};
