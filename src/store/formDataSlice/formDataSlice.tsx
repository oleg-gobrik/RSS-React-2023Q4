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
  data: [] as IFormData[],
  isValidForm: false,
};

const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    setForm: (state, action: PayloadAction<IFormData>) => {
      state.data.push(action.payload);
    },
    setValidForm: (state, action: PayloadAction<boolean>) => {
      state.isValidForm = action.payload;
    },
  },
});

export const { setForm, setValidForm } = formDataSlice.actions;
export default formDataSlice.reducer;
