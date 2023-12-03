import { FC, useEffect, useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import styles from './CardData.module.css';

export const CardData: FC = () => {
  const { data, isValidForm } = useAppSelector((state) => state.formData);
  const [isDisplayNewData, setIsDisplayNewData] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsDisplayNewData(false);
    }, 10000);
  }, []);
  console.log(isValidForm);
  if (isValidForm) {
    return (
      <div>
        {isDisplayNewData && <p className={styles.newData}>This is new data</p>}
        <p>Name: {data.name} </p>
        <p>Age: {data.age}</p>
        <p>Email: {data.email} </p>
        <p>Password: {data.firstPassword}</p>
        <p>Gender: {data.gender}</p>
        <p>Country: {data.country}</p>
        <img src={data.fileImage} alt="Image from user" width={300} />
      </div>
    );
  }
};

export default CardData;
