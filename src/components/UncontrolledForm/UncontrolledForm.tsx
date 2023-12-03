import { useRef, useState } from 'react';
import { AutoComplete } from '../AutoComplete/AutoComplete';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { setForm, setValidForm } from '../../store/formDataSlice/formDataSlice';
import { FormState } from '../../store/formDataSlice/formDataSlice';
import {
  initialValidationState,
  validationUncontrolledForm,
} from '../../utils/validation/validationUncontrolledForm';
import { validationMessages } from '../../utils/validation/validationMessages';
import { toBase64 } from '../../utils/methods';
import ErrorInput from '../ErrorInput/ErrorInput';

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
      genderRef.current?.value,
      imageRef.current?.files,
      countryRef.current?.value,
      termsAndConditionsRef.current?.checked
    );

    setValidationState(valid);

    if (isAllValid) {
      const image = (await toBase64(imageRef.current!.files![0])) as string;

      const data: FormState = {
        name: nameRef.current!.value,
        age: ageRef.current!.valueAsNumber,
        email: emailRef.current!.value,
        password: firstPasswordRef.current!.value,
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
        <label htmlFor="name">
          Name
          <ErrorInput
            textMessage={validationMessages.name}
            isValid={validationState.isValidName}
            isShow={isSecondFillingForm}
          />
        </label>
        <input type="text" id="name" name="name" ref={nameRef} />
      </div>
      <div>
        <label htmlFor="age">
          Age
          <ErrorInput
            textMessage={validationMessages.age}
            isValid={validationState.isValidAge}
            isShow={isSecondFillingForm}
          />
        </label>
        <input type="number" id="age" name="age" ref={ageRef} />
      </div>
      <div>
        <label htmlFor="email">
          Email
          <ErrorInput
            textMessage={validationMessages.email}
            isValid={validationState.isValidEmail}
            isShow={isSecondFillingForm}
          />
        </label>
        <input type="email" id="email" name="email" ref={emailRef} />
      </div>
      <div>
        <label htmlFor="firstPassword">
          Password
          <ErrorInput
            textMessage={validationMessages.firstPassword}
            isValid={validationState.isValidFirstPassword}
            isShow={isSecondFillingForm}
          />
        </label>
        <input
          type="password"
          id="firstPassword"
          name="Password"
          ref={firstPasswordRef}
        />
      </div>
      <div>
        <label htmlFor="secondPassword">
          Confirm Password
          <ErrorInput
            textMessage={validationMessages.secondPassword}
            isValid={validationState.isValidSecondPassword}
            isShow={isSecondFillingForm}
          />
        </label>
        <input
          type="password"
          id="secondPassword"
          name="Password"
          ref={secondPasswordRef}
        />
      </div>

      <label htmlFor="gender">
        Select gender
        <select id="gender" ref={genderRef}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>

      <div>
        <label htmlFor="image">
          Picture
          <ErrorInput
            textMessage={validationMessages.image}
            isValid={validationState.isValidImage}
            isShow={isSecondFillingForm}
          />
        </label>
        <input type="file" id="image" name="file" ref={imageRef} />
      </div>
      <div>
        <label htmlFor="country">
          Country
          <ErrorInput
            textMessage={validationMessages.country}
            isValid={validationState.isValidCountry}
            isShow={isSecondFillingForm}
          />
        </label>
        <AutoComplete id="country" inputRef={countryRef} />
      </div>
      <div>
        <label htmlFor="T&C">
          <input
            type="checkbox"
            id="T&C"
            name="T&C"
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
