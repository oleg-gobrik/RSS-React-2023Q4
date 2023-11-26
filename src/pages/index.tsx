import { wrapper } from '../store/store';
import {
  fetchSearchObject,
  getRunningQueriesThunk,
} from '../store/SearchService';
import { ApiResponsePeople } from '../utils/ApiResponse/ApiResponsePeople';
import { setSearch } from '../store/searchResultSlice/searchResultSlice';
import Searcher from '../components/Searcher/Searcher';
import { useSearchContext } from '../utils/contexts/SearchContext';
import { ReactElement } from 'react';
import Layout from './layout';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    const { search } = store.getState();

    const data = store.dispatch(
      fetchSearchObject.initiate({
        searchValue: search.searchValue,
        page: '1',
      })
    );
    const curData = (await data).data;
    if (curData) {
      store.dispatch(setSearch(curData));
    }

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: { data: curData },
    };
  }
);

const Page = ({ data }: { data: ApiResponsePeople | undefined }) => {
  const { density } = useSearchContext();
  if (data) {
    const pagesCount = Math.ceil(data.count / density);
    return (
      <Searcher searchResult={data} pagesCount={pagesCount} pageNumber="1" />
    );
  }
};
Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Page;
