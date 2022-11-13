// Contains routing and any application wide items like headers, footers and navigation

import React, { ReactElement } from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom'; // Use `HashRouter as Router` when you can't control the URL ... like GitHub pages
import { Container, Card } from 'react-bootstrap';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

const Router =
  process.env.REACT_APP_USE_HASH_ROUTER === 'true' ? HashRouter : BrowserRouter;

import { FeatureFlagged, useSetFeatureFlags } from 'feature-flags';
import { featureFlagArray } from './feature-flags.config';

import AppNavBar from './AppNavBar';
import AppRoutes from './AppRoutes';
import SetAxios from './components/SetAxios';

import './scss/index.scss';

const Header = (): ReactElement => (
  <header>
    <Card bg='dark' text='white'>
      <Card.Body>
        <Card.Title>Sample react application</Card.Title>
      </Card.Body>
    </Card>
  </header>
);

const Footer = (): ReactElement => (
  <footer>
    <Card bg='light' style={{ marginTop: '20px' }}>
      {/* EXAMPLE: Show/Hide based on feature flag */}
      <FeatureFlagged feature={'COLORS'}>
        <Card.Body>
          <strong>Colors:</strong> Red, Orange, Yellow, Green, Blue, Violet
        </Card.Body>
      </FeatureFlagged>
    </Card>
  </footer>
);
type UserContextType = {
  user: string;
  setUser: (userName: string) => void;
};

export const UserContext = React.createContext<UserContextType>({
  user: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: () => {},
});

const App = (): ReactElement => {
  const basename = '';
  const [user, setUser] = React.useState('superUser');
  const setFeatureFlags = useSetFeatureFlags();

  React.useEffect(() => {
    // START FEATURE FLAGS
    setFeatureFlags(featureFlagArray);
    // END FEATURE_FLAGS
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Router basename={basename}>
        <QueryClientProvider client={queryClient}>
          <SetAxios />
          <Header />
          <AppNavBar />
          <Container>
            <main>
              <UserContext.Provider value={{ user, setUser }}>
                <AppRoutes />
              </UserContext.Provider>
            </main>
          </Container>
          <Footer />
        </QueryClientProvider>
      </Router>
    </>
  );
};

export default App;
