import { wrapper } from '../../store/store';
import { fetchPerson, getRunningQueriesThunk } from '../../store/SearchService';
import { Person } from '../../utils/ApiResponse/ApiResponsePeople';
import Details from '../../components/CardDetails/Details';
import { ReactElement } from 'react';
import Layout from './layout';
import { useAppDispatch } from '../../store/hooks';
import { setPerson } from '../../store/searchResultSlice/searchResultSlice';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const id = context.params?.id;

    const data = store.dispatch(
      fetchPerson.initiate(typeof id === 'string' ? id : '0')
    );

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: { data: (await data).data },
    };
  }
);

const Page = ({ data }: { data: Person | undefined }) => {
  const dispatch = useAppDispatch();
  if (data) {
    dispatch(setPerson({ personDetails: data }));
    return <Details details={data} />;
  }
};
Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Page;
