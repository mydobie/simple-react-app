import React, { ReactElement } from 'react';
import { Row, Col } from 'react-bootstrap';

// *** Import selectors ***

// *** Import reducers ***

// *** Import components ***

// *** Main component ***
const SamplePage = (): ReactElement => {
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

  return (
    <div data-testid='pageContent'>
      <Row>
        <Col>
          {/* Page title */}
          <h1>Sample Page</h1>

          {/* Page content */}

          {/* End page content */}
        </Col>
      </Row>
    </div>
  );
};

export default SamplePage;
