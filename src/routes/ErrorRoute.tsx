import { useRouteError } from 'react-router-dom';
import { isRouteErrorResponse } from 'react-router-dom';

export default function ErrorRoute() {
  const error: unknown = useRouteError();
  return (
    <>
      <h1>Oops!</h1>
      {isRouteErrorResponse(error) && (
        <>
          <h2>{error.status}</h2>
          <p>{error.statusText}</p>
          {error.data?.message && <p>{error.data.message}</p>}
        </>
      )}
    </>
  );
}
