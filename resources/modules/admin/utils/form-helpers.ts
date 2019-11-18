import { Vue } from "vue-property-decorator";

export const checkOnRequired = (value = '') => Boolean(value.toString());
export const checkValidity = (el: HTMLInputElement) =>
  (el instanceof HTMLInputElement) && (el.checkValidity() || el.validationMessage);
export function formFieldValidator(elementRef: Vue | HTMLInputElement | (() => HTMLInputElement)) {
  return () => {
    let input = elementRef as HTMLInputElement;
    if (typeof elementRef === 'function') {
      input = elementRef();
    } else if ((typeof elementRef === 'object') && elementRef instanceof Vue) {
      input = (<Vue>elementRef).$refs.input as HTMLInputElement;
    }
    return checkValidity(input);
  };
};

export function resetFormState(this: ResetForm) {
  if (this.form) {
    this.form.reset();
  }
  // this.isRequestProcessing = false;
}

type ResetForm = {
  form: HTMLFormElement;
  // isRequestProcessing: boolean;
} & Vue;