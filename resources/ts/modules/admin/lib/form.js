/*
    type Fields = Array<{
        name: string;
        //options: {
            //value?: string;
            //requiredErrorMessage?: string;
            //invalidErrorMessage?: (fieldValue?: string) => string;
            //[attr: string]: any;
        //}
        rules: Array<{
            [rule: string]: string;
            errorMessage?: (fieldValue?: string) => string;
        }>;
        errorMessage?: (fieldValue?: string) => string;
        validator?: Function;
        elRef: HTMLElement;
    }>;
*/
export const isError = Symbol.for('isError');
export const message = Symbol.for('message');
export const elRef = Symbol.for('elRef');
export const validator = Symbol.for('validator');
export const errorMessage = Symbol.for('errorMessage');
export const rules = Symbol.for('rules');

export default class CreateCustomForm {

    formFields = {};

    construstor(...fields) {
        for (const { name, errorMessage, elRef, validator, rules } of fields) {
            this.formFields[name] = {
                value: '',
                [isError]: false,
                [message]: '',
                [elRef]: elRef,
                [validator]: validator,
                [errorMessage]: errorMessage,
                [rules]: rules
            };
        }
    }

    validate() {
        const { formFields } = this;
        for (const fieldName in formFields) {
            if (formFields.hasOwnProperty(fieldName)) {
                const field = formFields[fieldName];
                const elRef = field[elRef];
                let el = null;
                let isValid = false;
                let validationMessage = '';

                if (elRef && elRef.current) {
                    el = elRef.current;
                    isValid = el.checkValidity();
                    validationMessage = el.validationMessage;
                } else {
                    const validator = field[validator];
                    if (typeof validator === 'function') {
                        isValid = (!!validationMessage) = validator(field.value);
                    } else {
                        switch (fieldName.toLowerCase()) {
                            case 'email': {
                                // for (const key of Object.keys(field)) {
                                //     if (typeof this[key] === 'function') {
                                //         this[key]
                                //     }
                                // }
                                // if (field.required) {
                                //     isValid = [] !embeddedRequiredValidator(field.value);
                                // }
                            }
                        }
                    }

                }
            }
        }
    }

    onInput(inputName) {
        return event => {
            const currentInput = this.formFields[inputName];
            currentInput.value = event.target.value;
        };
    }

    maxLength(fieldValue = '', maxLength = 100) {
        return (String(fieldValue).length <= maxLength);
    }

    required(fieldValue = '') {
        return (String(fieldValue).length > 0);
    }

    embeddedEmailValidator(email = '') {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    embeddedPasswordValidator(password = '', minLength = 8) {
        return (String(password).length >= minLength);
    }

}
