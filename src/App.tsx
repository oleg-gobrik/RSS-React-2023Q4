import RouterSearch from './routes/RouterSearch';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { Provider } from 'react-redux';
import store from './store/store';

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
