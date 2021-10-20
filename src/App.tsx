// Contains routing and any application wide items like headers, footers and navigation

import React, { ReactElement, useReducer } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Use `HashRouter as Router` when you can't control the URL ... like GitHub pages
import { Container, Card } from 'react-bootstrap';

// START FEATURE FLAGS
import { loadFeatureFlags, isFeatureActive } from 'feature-flags/react';
import { featureFlagArray } from './feature-flags.config';
// END FEATURE FLAGS

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

const Footer = (): ReactElement => {
  // EXAMPLE: Show/Hide based on feature flag
  const isColors = isFeatureActive('COLORS');
  return (
    <footer>
      <Card bg='light' style={{ marginTop: '20px' }}>
        {isColors ? (
          <>
            <Card.Body>
              <strong>Colors:</strong> Red, Orange, Yellow, Green, Blue, Violet
            </Card.Body>
          </>
        ) : null}
      </Card>
    </footer>
  );
};

const App = (): ReactElement => {
  const basename = '';
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  React.useEffect(() => {
    // START FEATURE FLAGS
    loadFeatureFlags({
      features: featureFlagArray,
      overrides: JSON.parse(process.env.REACT_APP_FEATURE_FLAGS ?? '[]'),
      persist: process.env.REACT_APP_FEATURE_FLAGS_PERSIST === 'true',
    });
    // END FEATURE_FLAGS
  }, []);

  return (
    <>
      <Router basename={basename}>
        <SetAxios />
        <Header />
        <AppNavBar />
        <Container>
          <main>
            <AppRoutes onFeatureChange={forceUpdate} />
            {/* <AppRoutes /> */}
          </main>
        </Container>
        <Footer />
      </Router>
    </>
  );
};

export default App;
