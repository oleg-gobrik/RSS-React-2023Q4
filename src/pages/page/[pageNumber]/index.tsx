import { wrapper } from '../../../store/store';
import {
  fetchSearchObject,
  getRunningQueriesThunk,
} from '../../../store/SearchService';
import { ApiResponsePeople } from '../../../utils/ApiResponse/ApiResponsePeople';
import { setSearch } from '../../../store/searchResultSlice/searchResultSlice';
import { useAppDispatch } from '../../../store/hooks';
import Searcher from '../../../components/Searcher/Searcher';
import { useSearchContext } from '../../../utils/contexts/SearchContext';
import { useParams } from 'next/navigation';
import { ReactElement } from 'react';
import Layout from '../../layout';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { search } = store.getState();
    const pageNumber = context.params?.pageNumber;

    const data = store.dispatch(
      fetchSearchObject.initiate({
        searchValue: search.searchValue,
        page: typeof pageNumber === 'string' ? pageNumber : undefined,
      })
    );

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: { data: (await data).data },
    };
  }
);

const Page = ({ data }: { data: ApiResponsePeople | undefined }) => {
  const dispatch = useAppDispatch();
  const { pageNumber } = useParams();
  const { density } = useSearchContext();
  if (data) {
    dispatch(setSearch(data));
    const pagesCount = Math.ceil(data.count / density);
    return (
      <Searcher
        searchResult={data}
        pagesCount={pagesCount}
        pageNumber={pageNumber.toString()}
      />
    );
  }
};
Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Page;
