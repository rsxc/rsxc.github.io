import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import Header from './Header.tsx';
import endpoints from '../constants/endpoints.ts';
import FallbackSpinner from './FallbackSpinner.tsx';
import FadingTextComponent from './fading-text.tsx';

const styles = {
  introTextContainer: {
    margin: 10,
    flexDirection: 'column',
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
    fontSize: '1.2em',
    fontWeight: 500,
  },
  introImageContainer: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  imageStyles: {
    borderRadius: '50%',
  },
};

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
                <Row>
                  <Col style={styles.introImageContainer}>
                    <img src={data?.imageSource} alt="profile" style={styles.imageStyles} />
                  </Col>
                  <Col style={styles.introTextContainer as React.CSSProperties}>
                    <FadingTextComponent text={data.about} />
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
