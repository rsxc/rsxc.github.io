import { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import Header from './Header.tsx';
import endpoints from '../constants/endpoints.ts';
import FallbackSpinner from './FallbackSpinner.tsx';
import FadingTextComponent from './fading-text.tsx';

function About(props) {
  const { header } = props;
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(endpoints.about, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />
      <div className="section-content-container">
        <Container>
          {data
            ? (
              <Fade>
                <Row md={1} lg={2} className="flex-md-row-reverse flex-column">
                  <Col className="text-left pt-4">
                    <FadingTextComponent text={data.about} />
                  </Col>
                  <Col className="flex justify-center">
                    <img src={data?.imageSource} alt="profile" className="rounded-full" />
                  </Col>
                </Row>
              </Fade>
            )
            : <FallbackSpinner />}
        </Container>
      </div>
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;


