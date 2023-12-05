import {
  nameSchema,
  ageSchema,
  emailSchema,
  passwordSchema,
  imageSchema,
  countrySchema,
  termsAndConditionsSchema,
} from './validationSchema';

export const initialValidationState = {
  isValidName: false,
  isValidAge: false,
  isValidEmail: false,
  isValidFirstPassword: false,
  isValidSecondPassword: false,
  isValidImage: false,
  isValidCountry: false,
  isValidTermsAndConditions: false,
};

export const validationUncontrolledForm = async (
  name: string | null | undefined,
  age: number | null | undefined,
  email: string | null | undefined,
  firstPassword: string | null | undefined,
  secondPassword: string | null | undefined,
  image: FileList | null | undefined,
  country: string | null | undefined,
  termsAndConditions: boolean | undefined
) => {
  const isValidName = await nameSchema.isValid(name);
  const isValidAge = await ageSchema.isValid(age);
  const isValidEmail = await emailSchema.isValid(email);
  const isValidFirstPassword = await passwordSchema.isValid(firstPassword);
  const isValidSecondPassword = firstPassword === secondPassword;
  const isValidImage = await imageSchema.isValid(image);
  const isValidCountry = await countrySchema.isValid(country);
  const isValidTermsAndConditions = await termsAndConditionsSchema.isValid(
    termsAndConditions
  );

  const isAllValid =
    isValidName &&
    isValidAge &&
    isValidEmail &&
    isValidFirstPassword &&
    isValidSecondPassword &&
    isValidImage &&
    isValidTermsAndConditions;

  return {
    isValidName,
    isValidAge,
    isValidEmail,
    isValidFirstPassword,
    isValidSecondPassword,
    isValidImage,
    isValidCountry,
    isValidTermsAndConditions,
    isAllValid,
  };
};
