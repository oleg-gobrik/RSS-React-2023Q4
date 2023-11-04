//import SearchPage from './pages/SearchPage/SearchPage';
import RouterSearch from './routes/RouterSearch';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

function App() {
  return (
    <>
      <ErrorBoundary>
        <RouterSearch />
      </ErrorBoundary>
    </>
  );
}

export default App;
