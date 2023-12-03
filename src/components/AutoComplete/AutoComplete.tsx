import { ChangeEvent, FC, useState } from 'react';
import countries from '../../utils/data/countries.json';
import { Country } from '../../utils/data/countries';
import { UseFormRegisterReturn } from 'react-hook-form';
import { FormInputFieldKeys } from '../../utils/data/constant';
import styles from './AutoComplete.module.css';

interface autoCompleteProps {
  id: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  register?: (
    name: FormInputFieldKeys
  ) => UseFormRegisterReturn<FormInputFieldKeys>;
}

export const AutoComplete: FC<autoCompleteProps> = ({
  id,
  inputRef,
  register,
}) => {
  const [search, setSearch] = useState<{
    text: string;
    suggestions: Country[];
  }>({
    text: '',
    suggestions: [],
  });
  const [isComponentVisible, setIsComponentVisible] = useState(true);

  const onTextChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let suggestions: Country[] = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      suggestions = countries.sort().filter((v: Country) => regex.test(v.name));
    }
    setIsComponentVisible(true);
    setSearch({ suggestions, text: value });
  };

  const suggestionSelected = (value: Country) => {
    setIsComponentVisible(false);

    setSearch({
      text: value.name,
      suggestions: [],
    });
  };

  const { suggestions } = search;

  return (
    <>
      <div>
        {suggestions.length > 0 && isComponentVisible && (
          <ul className={styles.autocompleteContainer}>
            {suggestions.map((item: Country) => (
              <span key={item.code} className={styles.autocompleteValue}>
                <li key={item.code} onClick={() => suggestionSelected(item)}>
                  {item.name}
                </li>
              </span>
            ))}
          </ul>
        )}
        <input
          id={id}
          autoComplete="off"
          value={search.text}
          onChange={onTextChanged}
          type="text"
          ref={
            inputRef
              ? inputRef
              : register && register(FormInputFieldKeys.country).ref
          }
          onBlur={register && register(FormInputFieldKeys.country).onBlur}
          name={register && register(FormInputFieldKeys.country).name}
        />
      </div>
    </>
  );
};
