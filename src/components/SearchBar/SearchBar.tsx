import { dropdownCountCardsOnPage } from '../../utils/constants';
import Dropdown from '../Dropdown/Dropdown';
import SearchInput from '../SearchInput/SearchInput';

export default function SearchBar() {
  return (
    <section>
      <SearchInput />
      <Dropdown items={dropdownCountCardsOnPage} name="numberCards" />
    </section>
  );
}
