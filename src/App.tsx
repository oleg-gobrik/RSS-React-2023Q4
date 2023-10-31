import PageSearchContainer from './pages/PageSearchContainer/PageSearchContainer';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

function App() {
  return (
    <>
      <ErrorBoundary>
        <PageSearchContainer />
      </ErrorBoundary>
    </>
  );
}

export default App;
