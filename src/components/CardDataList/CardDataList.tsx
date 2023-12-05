import { FC, useEffect, useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import styles from './CardDataList.module.css';
import { IFormData } from '../../store/formDataSlice/formDataSlice';

export const CardDataList: FC = () => {
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
      <div className={styles.cardList}>
        {data.length &&
          data.map((item: IFormData, index) => (
            <div
              className={
                index === data.length - 1 && isDisplayNewData
                  ? styles.newCard
                  : styles.card
              }
              key={item.email + item.firstPassword}
            >
              <p>Name: {item.name} </p>
              <p>Age: {item.age}</p>
              <p>Email: {item.email} </p>
              <p>Password: {item.firstPassword}</p>
              <p>Gender: {item.gender}</p>
              <p>Country: {item.country}</p>
              <img
                className={styles.image}
                src={item.fileImage}
                alt="Image from user"
              />
            </div>
          ))}
      </div>
    );
  }
};

export default CardDataList;
