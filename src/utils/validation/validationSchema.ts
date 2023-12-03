import * as yup from 'yup';

export const nameSchema = yup
  .string()
  .trim()
  .test('is-valid-value', (name) => {
    if (!name) return false;
    return name.length > 3;
  })
  .required('Name is required');

export const ageSchema = yup
  .number()
  .positive('Age should be a positive number')
  .required('Age is required');

export const emailSchema = yup
  .string()
  .email('Invalid email address')
  .required('Email is required');

export const passwordSchema = yup
  .string()
  .trim()
  .matches(/[A-Z]/, 'Password must have at least 1 uppercase letter')
  .matches(/[a-z]/, 'Password must have at least 1 lowercase letter')
  .matches(/[$&+,:;=?@#|'<>.^*()%!-]/, 'Password must have at least 1 symbol')
  .matches(/[0-9]/, 'Password must have at least 1 number')
  .matches(/^.{8,}$/, 'Password must have at least 8 characters')
  .required('Password is required');

export const secondPasswordSchema = yup
  .string()
  .oneOf([yup.ref('firstPassword')], 'Passwords must match')
  .required('Confirm password is required');

export const genderSchema = yup.string().required('Gender must');

export const imageSchema = yup
  .mixed()
  .test(
    'type',
    'Invalid file format. Please upload a PNG or JPEG image',
    (value) => {
      if (!value || !(value as FileList)[0]) return false;
      return ['image/jpeg', 'image/png'].includes((value as FileList)[0].type);
    }
  )
  .required('Picture is required');

export const countrySchema = yup
  .string()
  .trim()
  .required('Country is required')
  .matches(/^[A-Za-z\s]*$/);

export const termsAndConditionsSchema = yup
  .bool()
  .oneOf([true], 'You must accept the terms and conditions');

export const formSchema = yup.object({
  name: nameSchema,
  age: ageSchema,
  email: emailSchema,
  firstPassword: passwordSchema,
  secondPassword: secondPasswordSchema,
  gender: genderSchema,
  fileImage: imageSchema,
  country: countrySchema,
  termsAndConditions: termsAndConditionsSchema,
});
