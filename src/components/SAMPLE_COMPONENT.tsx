import React, { ReactElement } from 'react';
import {} from 'react-bootstrap';

// eslint-disable-next-line @typescript-eslint/ban-types
type SampleComponentProps = {};

// *** Main component ***
// eslint-disable-next-line no-empty-pattern
const SampleComponent = ({}: SampleComponentProps): ReactElement => {
  //

  // eslint-disable-next-line arrow-body-style
  React.useEffect(() => {
    // *** items run on component mount ***

    return function cleanup() {
      // *** items run on component unmount ***
    };
  }, []);

  return <>Sample Component Content</>;
};

export default SampleComponent;
