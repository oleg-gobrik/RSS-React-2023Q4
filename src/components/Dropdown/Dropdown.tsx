import styles from "./Dropdown.module.css";

interface Props {
    items: number[],
    name: string, 
    changeValueHandler: (value: number) => void,
}

export default function Dropdown(props: Props) {
    return <>
        <label>
            Pick a number cards:
            <select name={props.name} 
                className={styles.dropdown} 
                defaultValue={props.items[0]}
                onChange={(event) => {props.changeValueHandler(+event.target.value)}}
            >
                {props.items.map((item) => (
                    <option 
                        className={styles.dropdownItem} 
                        key={item}
                        value={item}
                    >
                        {item}
                    </option>
                ))}
            </select>
        </label>
    </>
}