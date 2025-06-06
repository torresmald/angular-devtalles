import {
  AbstractControl,
  FormArray,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';

function sleep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 3000);
  });
}

export class FormHelpers {
  static errorHandle(errors: ValidationErrors) {
    console.log(errors);

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'El campo es requerido';
        case 'minlength':
          return `El campo debe tener al menos ${errors['minlength'].requiredLength} caracteres`;
        case 'min':
          return `El campo debe ser mininmo ${errors['min'].min}`;
        case 'pattern':
          return `El email no tiene un formato valido`;
        case 'emailTaken':
          return `El email ya esta siendo usado`;
        case 'invalidUser':
          return 'strider no es permitido';
      }
    }
    return null;
  }

  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return (
      !!form.controls[fieldName].errors && form.controls[fieldName].touched
    );
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName].errors) return null;
    const errors = form.controls[fieldName].errors ?? {};

    return this.errorHandle(errors);
  }

  static isValidFieldArray(form: FormArray, index: number): boolean | null {
    return !!(form.controls[index].errors && form.controls[index].touched);
  }

  static getFieldErrorArray(form: FormArray, index: number): string | null {
    if (!form.controls[index].errors) return null;
    const errors = form.controls[index].errors ?? {};
    return this.errorHandle(errors);
  }

  static isField1DifferentField2(field1: string, field2: string) {
    return (formGroup: AbstractControl) => {
      const value1 = formGroup.get(field1)?.value;
      const value2 = formGroup.get(field2)?.value;
      return value1 === value2 ? null : { password: true };
    };
  }

  static async checkingServer(
    control: AbstractControl
  ): Promise<ValidationErrors | null> {
    sleep();
    const value = control.value;
    if (value === 'hola@mundo.com') {
      return {
        emailTaken: true,
      };
    }
    return null;
  }

  static isInvalidUser(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    return value === 'strider' ? { invalidUser: true } : null;
  }

  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';
}
