import { useNavigate } from 'react-router-dom';
import { AutoComplete } from '../AutoComplete/AutoComplete';
import { useForm } from 'react-hook-form';
import { IFormData } from '../../store/formDataSlice/formDataSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { formSchema } from '../../utils/validation/validationSchema';
import { setForm, setValidForm } from '../../store/formDataSlice/formDataSlice';
import { FormInputFieldKeys } from '../../utils/data/constant';
import { toBase64 } from '../../utils/methods';
import { useAppDispatch } from '../../store/hooks';
import { IData } from './types';
import styles from './ControlledForm.module.css';

export default function ControlledForm() {
  const navigate = useNavigate();
  const form = useForm({ mode: 'onChange', resolver: yupResolver(formSchema) });
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid, errors },
  } = form;
  const dispatch = useAppDispatch();
  dispatch(setValidForm(false));

  const onSubmit = async (data: IData) => {
    const image = (await toBase64((data.fileImage as FileList)[0])) as string;
    const dataForm: IFormData = {
      name: data.name,
      age: data.age,
      email: data.email,
      firstPassword: data.firstPassword,
      secondPassword: data.secondPassword,
      gender: data.gender,
      fileImage: image,
      country: data.country,
      termsAndConditions: data.termsAndConditions!,
    };
    dispatch(setForm(dataForm));
    dispatch(setValidForm(true));
    navigate('/');
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor={FormInputFieldKeys.name}>
            Name
            {errors.name?.message && (
              <span className={styles.errorText}>{errors.name?.message}</span>
            )}
          </label>
          <input
            type="text"
            id={FormInputFieldKeys.name}
            {...register(FormInputFieldKeys.name)}
          />
        </div>
        <div>
          <label htmlFor={FormInputFieldKeys.age}>
            Age
            {errors.age?.message && (
              <span className={styles.errorText}>{errors.age?.message}</span>
            )}
          </label>
          <input
            type="number"
            id={FormInputFieldKeys.age}
            {...register(FormInputFieldKeys.age)}
          />
        </div>
        <div>
          <label htmlFor={FormInputFieldKeys.email}>
            Email
            {errors.email?.message && (
              <span className={styles.errorText}>{errors.email?.message}</span>
            )}
          </label>
          <input
            type="email"
            id={FormInputFieldKeys.email}
            {...register(FormInputFieldKeys.email)}
          />
        </div>
        <div>
          <label htmlFor={FormInputFieldKeys.firstPassword}>
            Password
            {errors.firstPassword?.message && (
              <span className={styles.errorText}>
                {errors.firstPassword?.message}
              </span>
            )}
          </label>
          <input
            type="password"
            id={FormInputFieldKeys.firstPassword}
            {...register(FormInputFieldKeys.firstPassword)}
          />
        </div>
        <div>
          <label htmlFor={FormInputFieldKeys.secondPassword}>
            Confirm Password
            {errors.secondPassword?.message && (
              <span className={styles.errorText}>
                {errors.secondPassword?.message}
              </span>
            )}
          </label>
          <input
            type="password"
            id={FormInputFieldKeys.secondPassword}
            {...register(FormInputFieldKeys.secondPassword)}
          />
        </div>

        <label htmlFor={FormInputFieldKeys.gender}>
          Select gender
          {errors.gender?.message && (
            <span className={styles.errorText}>{errors.gender?.message}</span>
          )}
          <select
            id={FormInputFieldKeys.gender}
            {...register(FormInputFieldKeys.gender)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>

        <div>
          <label htmlFor={FormInputFieldKeys.fileImage}>
            Picture
            {errors.fileImage?.message && (
              <span className={styles.errorText}>
                {errors.fileImage?.message}
              </span>
            )}
          </label>
          <input
            type="file"
            id={FormInputFieldKeys.fileImage}
            accept="image/jpeg, image/png"
            {...register(FormInputFieldKeys.fileImage)}
          />
        </div>
        <div>
          <label htmlFor={FormInputFieldKeys.country}>
            Country
            {errors.country?.message && (
              <span className={styles.errorText}>
                {errors.country?.message}
              </span>
            )}
          </label>
          <AutoComplete id={FormInputFieldKeys.country} register={register} />
        </div>
        <div>
          <label htmlFor={FormInputFieldKeys.termsAndConditions}>
            <input
              type="checkbox"
              id={FormInputFieldKeys.termsAndConditions}
              {...register(FormInputFieldKeys.termsAndConditions)}
            />
            “Agree to Terms & Conditions”
          </label>
          {errors.termsAndConditions?.message && (
            <p className={styles.errorText}>
              {errors.termsAndConditions?.message}
            </p>
          )}
        </div>
        <div>
          <button disabled={!isDirty || !isValid} type="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
