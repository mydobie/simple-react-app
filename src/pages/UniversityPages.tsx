/* eslint-disable no-console */
import React, { ReactElement, useState, useEffect } from 'react';
import { Row, Col, Card, Image, Button, Alert } from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';

import axios, { AxiosRequestConfig } from 'axios';
import Prism from 'prismjs';
import 'prismjs/themes/prism-dark.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Clipboard, Clipboard2Check } from 'react-bootstrap-icons';
import styled from 'styled-components';
import { universitiesAPI, ajaxFinally } from '../js/axios.config';
import mortarboardImg from '../images/mortarboard.svg';
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

// EXAMPLE: Using styled-components with existing component
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

const axiosConfig: AxiosRequestConfig = {
  url: universitiesAPI.url(), // EXAMPLE: Use of Ajax url and method helper
  method: universitiesAPI.method(),
};

// *** Main component ***
const UniversityPage = (): ReactElement => {
  const [univList, setUnivList] = useState<string[]>([]);

  // EXAMPLE: Use of React-query
  const { isLoading, error, data } = useQuery({
    queryKey: [],
    queryFn: () =>
      axios(axiosConfig).then(async (response) => {
        await ajaxFinally();

        return response.data;
      }),
    cacheTime: 60 * 1000,
    staleTime: 30 * 1000,
  });

  React.useEffect(() => {
    if (data && Array.isArray(data)) {
      const universitiesAll = data.map(
        (university: UniversityType) => university.name
      );
      const universitiesUnique: string[] = Array.from(new Set(universitiesAll));
      setUnivList(universitiesUnique);
    }
  }, [data]);

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
          {isLoading ? <Loading /> : null}
          {!isLoading && error ? (
            <Alert variant='danger'>{(error as Error).message}</Alert>
          ) : null}

          {!isLoading ? (
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
        {' '}
        <Col>{data ? <RawJSON json={data} /> : null}</Col>{' '}
      </Row>
    </>
  );
};

export default UniversityPage;
