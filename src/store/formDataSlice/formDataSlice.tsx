import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

export interface IFormData {
  name: string;
  age: number;
  email: string;
  firstPassword: string;
  secondPassword: string;
  gender: string;
  fileImage: string;
  country: string;
  termsAndConditions: boolean;
}

export const initialState = {
  data: {
    name: '',
    age: 0,
    email: '',
    firstPassword: '',
    secondPassword: '',
    gender: '',
    fileImage: '',
    country: '',
    termsAndConditions: false,
  } as IFormData,
  isValidForm: false,
};

const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    setForm: (state, action: PayloadAction<IFormData>) => {
      state.data.name = action.payload.name;
      state.data.age = action.payload.age;
      state.data.email = action.payload.email;
      state.data.firstPassword = action.payload.firstPassword;
      state.data.secondPassword = action.payload.secondPassword;
      state.data.gender = action.payload.gender;
      state.data.fileImage = action.payload.fileImage;
      state.data.country = action.payload.country;
      state.data.termsAndConditions = action.payload.termsAndConditions;
    },
    setValidForm: (state, action: PayloadAction<boolean>) => {
      state.isValidForm = action.payload;
    },
  },
});

export const { setForm, setValidForm } = formDataSlice.actions;
export default formDataSlice.reducer;
