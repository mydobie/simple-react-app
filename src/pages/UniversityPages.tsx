// The purpose is to make an ajax and store state call WITHOUT redux
// Copy what ever is done for the non-redux dinos page
import React, { ReactElement, useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { universitiesAPI, ajaxFinally } from '../js/axios.config';
import Alert from '../components/Alert';
import Loading from '../components/Loading';

// ** Main component type */
type UniversityType = {
  domains?: string[];
  name: string;
  country?: string;
  alpha_two_code?: string;
  'state-province'?: string | null;
  web_pages?: string[];
};

// EXAMPLE: Displaying result of ajax call to screen
const RawJSON = ({ json }: { json: string }): ReactElement => (
  <Card>
    <Card.Header>Returned JSON</Card.Header>
    <Card.Body>
      <Card.Text>{json}</Card.Text>
    </Card.Body>
  </Card>
);

// *** Main component ***
const UniversityPage = (): ReactElement => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // string or null
  const [univList, setUnivList] = useState([]);
  const [raw, setRaw] = useState<string | null>(null);

  useEffect(() => {
    const { CancelToken } = axios;
    const source = CancelToken.source();
    const loadUniversities = async () => {
      setLoading(true);
      setRaw(null);
      setUnivList([]);
      try {
        //  EXAMPLE: Ajax call in non-redux file
        const axiosConfig: AxiosRequestConfig = {
          url: universitiesAPI.url(), // EXAMPLE: Use of Ajax url and method helper
          method: universitiesAPI.method(),
          cancelToken: source.token,
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response: AxiosResponse<any> = await axios(axiosConfig);

        // EXAMPLE: Use of ajaxFinally helper
        await ajaxFinally();
        if (response.data) {
          const universities = response.data.map(
            (university: UniversityType) => university.name
          );
          setRaw(response.data);
          setUnivList(universities);
          setError(null);
        } else {
          throw Error('Uncaught Error');
        }
      } catch (_error) {
        setError('There was an error loading university names.');
      } finally {
        setLoading(false);
      }
    };
    loadUniversities();

    return function cleanup() {
      source.cancel('Operation canceled by the user.');
    };
  }, []);

  return (
    <Col>
      <Row>
        <h1>Minnesota Universities</h1>
        {loading ? <Loading /> : null}
        {error ? <Alert>{error}</Alert> : null}

        {!loading ? (
          <ul>
            {univList.map((university) => (
              <li key={university} data-testid='uniListItem'>
                {university}
              </li>
            ))}
          </ul>
        ) : null}
        {raw ? <RawJSON json={JSON.stringify(raw)} /> : null}
      </Row>
    </Col>
  );
};

export default UniversityPage;
