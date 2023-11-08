import styles from './Dropdown.module.css';
import { Props } from './types';

export default function Dropdown(props: Props) {
  return (
    <div className={styles.dropdown}>
      <label>
        Pick a number cards:
        <select
          name={props.name}
          className={styles.selector}
          defaultValue={props.items[0]}
          onChange={(event) => {
            props.changeValueHandler(+event.target.value);
          }}
        >
          {props.items.map((item) => (
            <option className={styles.dropdownItem} key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
