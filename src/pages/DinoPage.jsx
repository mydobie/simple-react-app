import React from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import { dinoApi, ajaxFinally } from '../js/axios.config';
import { isLocalHost } from '../js/whichEnv';

import Loading from '../components/Loading';
import DinoListItem from '../components/DinoListItem';
import DinoList from '../components/DinoList';

import Errors from '../components/Alert';

class DinoPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { dinos: [], error: '', loading: false, raw: [] };
    this.dinoList = this.dinoList.bind(this);
    this.handleSelectDinoToggle = this.handleSelectDinoToggle.bind(this);
  }

  async componentDidMount() {
    const { CancelToken } = axios;
    this.source = CancelToken.source();
    this.setState({ loading: true, error: '' });

    try {
      //  EXAMPLE: Ajax call in non-redux file
      const response = await axios({
        method: dinoApi.method(), // EXAMPLE: Use of Ajax url and method helper
        url: dinoApi.url(),
        cancelToken: this.source.token,
        data: {},
      });

      const dinos = response.data[0].map((dino, index) => ({
        key: index.toString(),
        text: dino,
        checked: false,
      }));

      // EXAMPLE: Use of ajaxFinally helper
      ajaxFinally(() => {
        this.setState({ loading: false, dinos, raw: response.data });
      });
    } catch (e) {
      let error = 'There was an error getting your dinosaurs.';
      if (isLocalHost()) {
        error = `${error} This may most likely due that you are serving this as localhost and there is CORS restriction on the api endpoint ${dinoApi.url()}.  Try running 'npm run start:mock' to use a mocked endpoint.`;
      }
      this.setState({
        loading: false,
        error,
      });
    }
  }

  componentWillUnmount() {
    this.source.cancel('Operation canceled by the user.');
  }

  handleSelectDinoToggle(dinoId, checked) {
    const { dinos } = this.state;

    const newDinos = [...dinos];
    const dinoIndex = newDinos.findIndex((dino) => dino.key === dinoId);

    if (dinoIndex !== -1) {
      newDinos[dinoIndex].checked = checked;
    }
    this.setState({ dinos: newDinos });
  }

  // EXAMPLE: Displaying result of ajax call to screen
  // Note: "raw" is set in the ajax call in the component did mount method
  // Note:  This method is called in the render method below
  showRawData() {
    const { raw } = this.state;
    return (
      <div
        style={{
          marginBottom: '20px',
          border: '1px solid #ccc',
          padding: '15px',
        }}
      >
        <h2>Response from ajax call</h2>
        {JSON.stringify(raw)}
      </div>
    );
  }

  dinoList() {
    const { dinos } = this.state;
    return (
      <div>
        <h2>Please select dinosaurs:</h2>

        <ul>
          {dinos.map((dino) => (
            <DinoListItem
              key={dino.key}
              dinoName={dino.text}
              dinoId={dino.key.toString()}
              checked={dino.checked}
              changeCheckBox={this.handleSelectDinoToggle}
            />
          ))}
        </ul>
      </div>
    );
  }

  render() {
    const { error, loading, dinos } = this.state;
    return (
      <Container>
        <Row>
          <Col>
            <h1>Dino Sample Page</h1>
          </Col>
        </Row>
        <Row>
          <Col id='mainContent'>
            {/* EXAMPLE: Using conditional display logic (aka show if) */}
            {error === '' ? null : <Errors>{error}</Errors>}
            {loading === true ? <Loading /> : null}
            {loading === false && error === '' ? (
              <div>
                {this.showRawData()}
                <div id='dinoLists'>
                  {this.dinoList()}
                  <DinoList
                    selectedDinos={dinos.filter(
                      (dino) => dino.checked === true
                    )}
                  />
                </div>
              </div>
            ) : null}
          </Col>
        </Row>
      </Container>
    );
  }
}

DinoPage.propTypes = {};
DinoPage.defaultProps = {};

export default DinoPage;
