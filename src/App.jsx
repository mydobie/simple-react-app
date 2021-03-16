// Contains routing and any application wide items like headers, footers and navigation
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Use `HashRouter as Router` when you can't control the URL ... like GitHub pages
import { Alert } from 'reactstrap';
import { isDev, isTest } from './js/whichEnv';

// START FEATURE FLAGS
// eslint-disable-next-line import/order
import { loadFeatureFlags } from 'feature_flags';
import { featureFlagArray } from './feature-flags.config';
// END FEATURE FLAGS

import AppNavBar from './AppNavBar';
import AppRoutes from './AppRoutes';

const envBanner = () => {
  if (isDev()) {
    return (
      <Alert color='warning'>
        This is a <strong>development</strong> environment.
      </Alert>
    );
  }
  if (isTest()) {
    return (
      <Alert color='primary'>
        This is a <strong>test</strong> environment.
      </Alert>
    );
  }
  return null;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.reRenderApp = this.reRenderApp.bind(this);
  }

  async componentDidMount() {
    // START FEATURE FLAGS
    // NOTE: featureFlagArray is from feature-flags.config.js file
    loadFeatureFlags(featureFlagArray, false, this.reRenderApp());
    // END FEATURE FLAGS
  }

  componentWillUnmount() {}

  reRenderApp(/* features */) {
    // NOTE:  You can do an ajax call to send updated feature flags here
    this.forceUpdate();
  }

  render() {
    const basename = '';
    return (
      <div>
        {envBanner()}
        <Router basename={basename}>
          <header />
          <AppNavBar />
          <main>
            <AppRoutes onFeatureChange={this.reRenderApp} />
          </main>
          <footer />
        </Router>
      </div>
    );
  }
}
export default App;
