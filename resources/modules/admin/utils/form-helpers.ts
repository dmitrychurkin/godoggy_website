
export function formFieldValidator(id: string) {
  return () => {
    const inputEl = document.getElementById(id);
    return (inputEl instanceof HTMLInputElement) &&
      (inputEl.checkValidity() || inputEl.validationMessage);
  };
};
