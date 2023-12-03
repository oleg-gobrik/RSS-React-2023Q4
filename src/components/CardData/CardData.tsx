import { FC } from 'react';
import { useAppSelector } from '../../store/hooks';

export const CardData: FC = () => {
  const { data, isValidForm } = useAppSelector((state) => state.formData);
  if (isValidForm)
    return (
      <div>
        <p>Name: {data.name} </p>
        <p>Age: {data.age}</p>
        <p>Email: {data.email} </p>
        <p>Password: {data.password}</p>
        <p>Gender: {data.gender}</p>
        <p>Country: {data.country}</p>
        <p>Picture: </p>
      </div>
    );
};

export default CardData;
