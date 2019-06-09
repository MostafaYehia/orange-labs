import { FormControl, AbstractControl } from "@angular/forms";

export const requiredFileTypes = (types: string[]) => {
  return function(control: FormControl) {
    const file = control.value;
    if (file) {
      const extension = file.name.split(".")[1].toLowerCase();

      if (!types.includes(extension.toLowerCase())) {
        return {
          requiredFileTypes: true
        };
      }

      return null;
    }

    return null;
  };
};

export const confirmedPassword = (
  control: AbstractControl
): { [key: string]: boolean } => {
  const password = control.get("password").value;
  const passwordConfirmation = control.get("passwordConfirmation").value;
  if (password && passwordConfirmation) {
    if (password !== passwordConfirmation) {
      return {
        notIdentical: true
      };
    }

    return null;
  }

  return null;
};

export const passwordPatter = minLength => {
  return (control: FormControl) => {
    const password = control.value;
    if (password) {
      const hasUpperCaseLetter = /(?=.*[A-Z])/.test(password);
      const hasDigit = /(?=.*\d)/.test(password);
      const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      const passowrdPattern = {
        hasUpperCaseLetter: null,
        hasDigit: null,
        hasSymbol: null,
        minLength: null
      };

      let notValid = true;
      if (!hasUpperCaseLetter) passowrdPattern["hasUpperCaseLetter"] = true;
      if (!hasDigit) passowrdPattern["hasDigit"] = true;
      if (!hasSymbol) passowrdPattern["hasSymbol"] = true;
      if (password.length < minLength) passowrdPattern["minLength"] = true;

      if (hasDigit && hasSymbol && hasUpperCaseLetter && password.length >= 8)
        notValid = false;

      if (notValid)
        return {
          requiredPattern: passowrdPattern
        };

      return null;
    }
  };
};
export const validNamePatter = (control: FormControl) => {
  const name = control.value;
  const pattern = /^([a-zA-z\s]{1,30})$/g;

  if (name) {
    if (!pattern.test(name)) {
      return {
        invalidPattern: true
      };
    }
  }

  return null;
};

export const validPhoneNumber = (control: FormControl) => {
  const phone = control.value;
  const pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  if (phone) {
    if (!pattern.test(phone)) {
      return {
        invalidPattern: true
      };
    }
  }

  return null;
};
