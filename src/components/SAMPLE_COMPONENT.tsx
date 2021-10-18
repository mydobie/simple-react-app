import React, { ReactElement } from 'react';
import {} from 'react-bootstrap';

// *** Import selectors ***

// *** Import reducers ***

// *** Import components ***

// ** Main component type */
// eslint-disable-next-line @typescript-eslint/ban-types
type SampleComponentType = {};

// *** Main component ***
// eslint-disable-next-line no-empty-pattern
const SampleComponent = ({}: SampleComponentType): ReactElement => {
  // const dispatch = useDispatch();

  // *** Selectors ***
  // const items: SampleItemType[] = useGetItems();

  // *** State (useState) ***
  //  const [myMessage, setMyMessage] = React.useState('');

  // *** On component load ***
  // eslint-disable-next-line arrow-body-style
  React.useEffect(() => {
    // *** items run on component mount ***

    return function cleanup() {
      // *** items run on component unmount ***
    };
  }, []);

  // *** Return ***
  return (
    <div data-testid='componentContent'>
      {/* Component content */}

      {/* End component content */}
    </div>
  );
};

export default SampleComponent;
