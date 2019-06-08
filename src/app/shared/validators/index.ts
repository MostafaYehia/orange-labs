import { FormControl } from "@angular/forms";

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

export const validNamePatter = () => {
  return function(control: FormControl) {
    const name = control.value;
    const pattern = /^([a-zA-z\s]{1,30})$/g;

    if(name) {
      if (!pattern.test(name)) {
        return {
          invalidPattern: true
        };
      }
    }

    return null;
  };
};
