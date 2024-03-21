import React, { useEffect, useState, useContext } from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import { ThemeContext } from 'styled-components';
import endpoints from '../constants/endpoints.ts';
import Header from './Header.tsx';
import FallbackSpinner from './FallbackSpinner.tsx';
import '../css/education.css';

function Education(props) {
  const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState<any>(null);
  const [width, setWidth] = useState('50vw');

  useEffect(() => {
    fetch(endpoints.education, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);

    if (window?.innerWidth < 576) {
      setWidth('90vw');
    } else if (window?.innerWidth >= 576 && window?.innerWidth < 768) {
      setWidth('90vw');
    } else if (window?.innerWidth >= 768 && window?.innerWidth < 1024) {
      setWidth('75vw');
    } else {
      setWidth('50vw');
    }
  }, []);

  return (
    <>
      <Header title={header} />
      {data ? (
        <Fade>
          <div style={{ width }} className="section-content-container">
            <Container>
              
               {data.education.map((education) => (education.icon ? (
                <>
                <img
                  key={education.icon.src}
                  src={education.icon.src}
                  alt={education.icon.alt}
                  style={{backgroundColor : theme?.titleColor}}
                />
                <p> {education.title} </p>
                <h1> {education.cardTitle}</h1>
                <p> {education.cardSubtitle}</p>
                <ul>
                {education.cardDetailedText.map((degree) => (<li> {degree} </li>))}
                </ul>
                </>
              ) : null))}
            </Container>
          </div>
        </Fade>
      ) : <FallbackSpinner /> }
    </>
  );
}

Education.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Education;
