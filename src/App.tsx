import SearchPage from './pages/SearchPage/SearchPage';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

function App() {
  return (
    <>
      <ErrorBoundary>
        <SearchPage />
      </ErrorBoundary>
    </>
  );
}

export default App;
