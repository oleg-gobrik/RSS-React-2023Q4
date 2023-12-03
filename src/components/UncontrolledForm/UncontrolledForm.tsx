import { useRef, useState } from 'react';
import { AutoComplete } from '../AutoComplete/AutoComplete';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { setForm, setValidForm } from '../../store/formDataSlice/formDataSlice';
import { IFormData } from '../../store/formDataSlice/formDataSlice';
import {
  initialValidationState,
  validationUncontrolledForm,
} from '../../utils/validation/validationUncontrolledForm';
import {
  helperText,
  validationMessages,
} from '../../utils/validation/validationMessages';
import { toBase64 } from '../../utils/methods';
import ErrorInput from '../ErrorInput/ErrorInput';
import { FormInputFieldKeys } from '../../utils/data/constant';
import Helper from '../Helper/Helper';

export default function ControlledForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [validationState, setValidationState] = useState(
    initialValidationState
  );
  const [isSecondFillingForm, setIsSecondFillingForm] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const firstPasswordRef = useRef<HTMLInputElement>(null);
  const secondPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const termsAndConditionsRef = useRef<HTMLInputElement>(null);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { isAllValid, ...valid } = await validationUncontrolledForm(
      nameRef.current?.value,
      ageRef.current?.valueAsNumber,
      emailRef.current?.value,
      firstPasswordRef.current?.value,
      secondPasswordRef.current?.value,
      imageRef.current?.files,
      countryRef.current?.value,
      termsAndConditionsRef.current?.checked
    );

    setValidationState(valid);

    if (isAllValid) {
      const image = (await toBase64(imageRef.current!.files![0])) as string;

      const data: IFormData = {
        name: nameRef.current!.value,
        age: ageRef.current!.valueAsNumber,
        email: emailRef.current!.value,
        firstPassword: firstPasswordRef.current!.value,
        secondPassword: secondPasswordRef.current!.value,
        gender: genderRef.current!.value,
        fileImage: image,
        country: countryRef.current!.value,
        termsAndConditions: termsAndConditionsRef.current!.checked,
      };
      dispatch(setForm(data));
      dispatch(setValidForm(true));
      navigate('/');
    } else {
      setIsSecondFillingForm(true);
      dispatch(setValidForm(false));
    }
  };

  return (
    <form onSubmit={(event) => submitHandler(event)}>
      <div>
        <label htmlFor={FormInputFieldKeys.name}>
          Name
          <ErrorInput
            textMessage={validationMessages.name}
            isValid={validationState.isValidName}
            isShow={isSecondFillingForm}
          />
        </label>
        <input type="text" id={FormInputFieldKeys.name} ref={nameRef} />
      </div>
      <div>
        <label htmlFor={FormInputFieldKeys.age}>
          Age
          <ErrorInput
            textMessage={validationMessages.age}
            isValid={validationState.isValidAge}
            isShow={isSecondFillingForm}
          />
        </label>
        <input type="number" id={FormInputFieldKeys.age} ref={ageRef} />
      </div>
      <div>
        <label htmlFor={FormInputFieldKeys.email}>
          Email
          <ErrorInput
            textMessage={validationMessages.email}
            isValid={validationState.isValidEmail}
            isShow={isSecondFillingForm}
          />
        </label>
        <input type="email" id={FormInputFieldKeys.email} ref={emailRef} />
      </div>
      <div>
        <label htmlFor={FormInputFieldKeys.firstPassword}>
          Password
          {!validationState.isValidFirstPassword && isSecondFillingForm && (
            <Helper
              helperText={helperText}
              mainText={validationMessages.firstPassword}
            />
          )}
        </label>
        <input
          type="password"
          id={FormInputFieldKeys.firstPassword}
          ref={firstPasswordRef}
        />
      </div>
      <div>
        <label htmlFor={FormInputFieldKeys.secondPassword}>
          Confirm Password
          <ErrorInput
            textMessage={validationMessages.secondPassword}
            isValid={validationState.isValidSecondPassword}
            isShow={isSecondFillingForm}
          />
        </label>
        <input
          type="password"
          id={FormInputFieldKeys.secondPassword}
          ref={secondPasswordRef}
        />
      </div>

      <label htmlFor={FormInputFieldKeys.gender}>
        Select gender
        <select id={FormInputFieldKeys.gender} ref={genderRef}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>

      <div>
        <label htmlFor={FormInputFieldKeys.fileImage}>
          Picture
          <ErrorInput
            textMessage={validationMessages.image}
            isValid={validationState.isValidImage}
            isShow={isSecondFillingForm}
          />
        </label>
        <input type="file" id={FormInputFieldKeys.fileImage} ref={imageRef} />
      </div>
      <div>
        <label htmlFor={FormInputFieldKeys.country}>
          Country
          <ErrorInput
            textMessage={validationMessages.country}
            isValid={validationState.isValidCountry}
            isShow={isSecondFillingForm}
          />
        </label>
        <AutoComplete id={FormInputFieldKeys.country} inputRef={countryRef} />
      </div>
      <div>
        <label htmlFor={FormInputFieldKeys.termsAndConditions}>
          <input
            type="checkbox"
            id={FormInputFieldKeys.termsAndConditions}
            ref={termsAndConditionsRef}
          />
          “Agree to Terms & Conditions”
          <ErrorInput
            textMessage={validationMessages.termsAndConditions}
            isValid={validationState.isValidTermsAndConditions}
            isShow={isSecondFillingForm}
          />
        </label>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
