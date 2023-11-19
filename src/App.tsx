import RouterSearch from './routes/RouterSearch';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';

const store = setupStore({});

function App() {
  return (
    <>
      <ErrorBoundary>
        <Provider store={store}>
          <RouterSearch />
        </Provider>
      </ErrorBoundary>
    </>
  );
}

export default App;
