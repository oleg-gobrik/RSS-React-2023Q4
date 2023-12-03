import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

export interface FormState {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  fileImage: string | null;
  country: string;
  termsAndConditions: boolean;
}

export const initialState = {
  data: {
    name: '',
    age: 0,
    email: '',
    password: '',
    gender: '',
    fileImage: null,
    country: '',
    termsAndConditions: false,
  } as FormState,
  isValidForm: false,
};

const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    setForm: (state, action: PayloadAction<FormState>) => {
      state.data.name = action.payload.name;
      state.data.age = action.payload.age;
      state.data.email = action.payload.email;
      state.data.password = action.payload.password;
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
