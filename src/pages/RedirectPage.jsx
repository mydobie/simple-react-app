// For more information on all methods, see:
// https://dev.to/projectescape/programmatic-navigation-in-react-3p1l

import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';

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
    // EXAMPLE: Automatically forwarding to a route (without a button click)

    // Method 1 ... once a redirect component is shown, the user will be redirected
    const { countdown } = this.state;
    this.setState({ countdown: countdown - 1 });

    // Method 2 ...  use directly in JS (no additional components needed)
    // const { history } = this.props;
    // history.push('/home');
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
            You will automatically be directed to the home page in {countdown}{' '}
            seconds!
            {countdown === 0 ? <Redirect to='/home' /> : null}{' '}
            {/* Redirect component only used in method 1 */}
          </Col>
        </Row>
      </Container>
    );
  }
}

RedirectPage.propTypes = {};
RedirectPage.defaultProps = {};

export default withRouter(RedirectPage); // NOTE the use of "withRouter" is only required with method 2
