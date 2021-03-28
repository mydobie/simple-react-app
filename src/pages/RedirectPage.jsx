// For more information on all methods, see:
// https://dev.to/projectescape/programmatic-navigation-in-react-3p1l

/* NOTE:

There are three ways to automatically direct a user to a given route:
1. Use History Hook (only works on function based components)
2. Use History prop (only works on class based components)
3. Use redirect component (less ideal)

The above methods should NOT be used with a button or link.

*/

import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
// import { Redirect } from 'react-router'; // Needed for method 3
import { withRouter, Link } from 'react-router-dom';
// import { useHistory } from 'react-router-dom'; // Needed for method 1

class RedirectPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { countdown: 5 };
  }

  componentDidMount() {
    setInterval(() => {
      this.countDown();
    }, 1000);
  }

  // eslint-disable-next-line class-methods-use-this
  countDown() {
    const { countdown } = this.state;

    // EXAMPLE: Automatically forwarding to a route (without a button click)
    // Method 2 (use History props - class based component ONLY) ...  use directly in JS (no additional components needed)

    const { history } = this.props;
    if (countdown === 0) {
      return history.push('/home');
    }

    // Method 1 (ONLY works on function based component - will not work in this example)
    /*
    if (countdown === 0) {
      const history = useHistory();
      return history.push('/home');
    }
    */

    return this.setState({ countdown: countdown - 1 });
  }

  render() {
    const { countdown } = this.state;
    return (
      <Container>
        <Row>
          <Col>
            <h1>Redirect</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>
              You will automatically be directed to the home page in {countdown}{' '}
              seconds!
            </p>
            {/* Redirect component only used in method 3
            {countdown === 0 ? <Redirect to='/home' /> : null}{' '}
            */}

            <p>
              {/* Link to route */}
              <Link to='/'>Go to home page</Link>
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}

RedirectPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};
RedirectPage.defaultProps = { history: { push: () => {} } };

export default withRouter(RedirectPage); // NOTE the use of "withRouter" is only required with method 2
