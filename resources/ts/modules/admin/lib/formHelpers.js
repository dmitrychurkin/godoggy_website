import { useRef } from "react";

export const booleanInputNames = [
  'remember'
];

export const emailValidationConstraints = {
  maxLength: 255,
  pattern: `[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$`
};

export const passwordValidationConstraints = {
  minLength: 8,
  maxLength: 255
};

const defaultFieldValues = {
  isInvalid: false,
  validationMessage: '',
  value: ''
};
const defaultFormFields = [
  { inputName: 'email', ...defaultFieldValues },
  { inputName: 'password', ...defaultFieldValues },
  { inputName: 'password_confirmation', ...defaultFieldValues },
  { inputName: booleanInputNames[0], ref: null, value: false }
];

export const setDefaultFormFields = (fieldValuesToSet = {}) => defaultFormFields.reduce(
  (acc, { inputName, ...rest }) => ({
    ...acc,
    [inputName]: {
      ...rest,
      ...(fieldValuesToSet[inputName] || {}),
    }
  }),
  {}
);

export const getForm = (formFields = setDefaultFormFields()) => Object.keys(formFields).reduce(
  (acc, fieldName) => ({
    ...acc,
    [fieldName]: {
      ...acc[fieldName],
      ref: useRef(null)
    }
  }),
  { ...formFields, isRequestSent: false }
);

export const resetFormFields = (formFields = setDefaultFormFields()) => prevState => Object.keys(formFields).reduce(
  (acc, fieldName) => ({
    ...acc,
    [fieldName]: {
      ...acc[fieldName],
      ...formFields[fieldName]
    }
  }),
  { ...prevState, isRequestSent: false }
);

export function isFormValid(e) {
  e.preventDefault();
  return e.target.checkValidity();
}

export function onChange(
  inputName,
  [formState, setFormState],
  isBooleanInput = false
) {
  return ({ target: { value, checked } }) => {
    const currentInput = formState[inputName];
    currentInput.value = (isBooleanInput || booleanInputNames.includes(inputName)) ? checked : value;
    setFormState(prev => ({ ...prev, [inputName]: currentInput }));
  };
}

export function onBlur(
  inputName,
  [formState, setFormState]
) {
  return () => {
    const currentInput = formState[inputName];
    const { current } = currentInput.ref;
    currentInput.validationMessage = current.validationMessage;
    currentInput.isInvalid = !current.checkValidity();
    setFormState(prev => ({ ...prev, [inputName]: currentInput }));
  };
}

export const restrictLinkFollow = isRequestInProcess => e => isRequestInProcess && e.preventDefault();