'use client';
import styles from './Dropdown.module.css';
import { useSearchContext } from '../../utils/contexts/SearchContext';
import { useRouter } from 'next/navigation';
import { Props } from './types';

export default function Dropdown(props: Props) {
  const { setValueDensity } = useSearchContext();
  const router = useRouter();

  const changeDropdownValue = (value: number) => {
    setValueDensity(value);
    router.push('/page/1');
  };

  return (
    <div className={styles.dropdown}>
      <label className={styles.containerDropdown}>
        <div className={styles.textLabel}>Pick a number cards:</div>
        <select
          name={props.name}
          className={styles.selector}
          defaultValue={props.items[0]}
          onChange={(event) => {
            changeDropdownValue(+event.target.value);
          }}
        >
          {props.items.length &&
            props.items.map((item) => (
              <option className={styles.dropdownItem} key={item} value={item}>
                {item}
              </option>
            ))}
        </select>
      </label>
    </div>
  );
}
