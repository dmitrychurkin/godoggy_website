import { useRef } from 'react';

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

export const getForm = (...args) => args.reduce(
  (acc, { inputName, ref = useRef(null), value = '' }) => ({
    ...acc,
    [inputName]: {
      isInvalid: false,
      validationMessage: '',
      ref,
      value
    }
  }),
  {}
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