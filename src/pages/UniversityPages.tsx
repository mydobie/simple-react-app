import React, { ReactElement, useState, useEffect } from 'react';
import { Row, Col, Card, Image, Button } from 'react-bootstrap';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Prism from 'prismjs';
import 'prismjs/themes/prism-dark.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Clipboard, Clipboard2Check } from 'react-bootstrap-icons';
import styled from 'styled-components';
import { universitiesAPI, ajaxFinally } from '../js/axios.config';
import Alert from '../components/Alert';
import Loading from '../components/Loading';
import mortarboardImg from '../images/mortarboard.svg';

// ** Main component type */
type UniversityType = {
  domains?: string[];
  name: string;
  country?: string;
  alpha_two_code?: string;
  'state-province'?: string | null;
  web_pages?: string[];
};

// EXAMPLE: Styled existing component
// use styled.button instead of styled(Button) if you want to use a native button
const CopyButton = styled(Button)`
  position: absolute;
  right: 20px;
  top: 20px;
`;

// EXAMPLE: Displaying result of ajax call to screen
const RawJSON = ({ json }: { json: object }): ReactElement => {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  useEffect(() => {
    if (copied) {
      setTimeout(() => setCopied(false), 3000);
    }
  }, [copied]);
  const jsonString = JSON.stringify(json, null, 2);
  return (
    <Card>
      <Card.Header>Returned JSON</Card.Header>
      <div style={{ position: 'relative' }}>
        <CopyToClipboard text={jsonString} onCopy={() => setCopied(true)}>
          <CopyButton variant='light'>
            {copied ? <Clipboard2Check /> : <Clipboard />}
            <span className='visually-hidden sr-only'>
              {copied ? 'Copied' : 'Copy to clipboard'}
            </span>
          </CopyButton>
        </CopyToClipboard>
        <pre>
          <code className={`language-javascript`}>
            {/* EXAMPLE: Format JSON response */}
            {jsonString}
          </code>
        </pre>
      </div>
    </Card>
  );
};

// *** Main component ***
const UniversityPage = (): ReactElement => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // string or null
  const [univList, setUnivList] = useState([]);
  const [raw, setRaw] = useState<object | null>(null);

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
    <>
      <Row>
        <h1>Minnesota Universities</h1>
      </Row>
      <Row>
        <Col xs={2}>
          {/* EXAMPLE: Include an image */}
          <Image src={mortarboardImg} alt='' fluid />
        </Col>
        <Col>
          {/* EXAMPLE: Using conditional display logic (aka show if) */}
          {loading ? <Loading /> : null}
          {error ? <Alert>{error}</Alert> : null}

          {!loading ? (
            <ul>
              {/* EXAMPLE: Using map to display items from an array */}
              {univList.map((university) => (
                <li key={university} data-testid='uniListItem'>
                  {university}
                </li>
              ))}
            </ul>
          ) : null}
        </Col>
      </Row>
      <Row>
        <Col>{raw ? <RawJSON json={raw} /> : null}</Col>
      </Row>
    </>
  );
};

export default UniversityPage;
