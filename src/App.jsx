// Contains routing and any application wide items like headers, footers and navigation
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Use `HashRouter as Router` when you can't control the URL ... like GitHub pages
import { Alert } from 'react-bootstrap';
import { UmnHeader, UmnFooter } from 'umn_web_template_components';

// START FEATURE FLAGS
// eslint-disable-next-line import/order
import { loadFeatureFlags } from 'feature_flags';
import { isDev, isTest } from './js/whichEnv';
import { featureFlagArray } from './feature-flags.config';
// END FEATURE FLAGS

import AppNavBar from './AppNavBar';
import AppRoutes from './AppRoutes';

import SetAxios from './components/SetAxios';

const envBanner = () => {
  if (isDev()) {
    return (
      <Alert variant='warning'>
        This is a <strong>development</strong> environment.
      </Alert>
    );
  }
  if (isTest()) {
    return (
      <Alert variant='primary'>
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
          <SetAxios />
          <UmnHeader />
          <AppNavBar />
          <main>
            <AppRoutes onFeatureChange={this.reRenderApp} />
          </main>
          <UmnFooter />
        </Router>
      </div>
    );
  }
}
export default App;
