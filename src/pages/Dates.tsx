import React, { ReactElement } from 'react';
import {} from 'react-bootstrap';

// eslint-disable-next-line @typescript-eslint/ban-types
type SamplePageProps = {};

// *** Main component ***
// eslint-disable-next-line no-empty-pattern
const SamplePage = ({}: SamplePageProps): ReactElement => {
  //

  // eslint-disable-next-line arrow-body-style
  React.useEffect(() => {
    // *** items run on component mount ***

    return function cleanup() {
      // *** items run on component unmount ***
    };
  }, []);

  return <>Sample Page Content</>;
};

export default SamplePage;
