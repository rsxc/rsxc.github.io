import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import { Container } from 'react-bootstrap';
import Header from './Header.tsx';
import endpoints from '../constants/endpoints.ts';
import FallbackSpinner from './FallbackSpinner.tsx';

const styles = {
  iconStyle: {
    height: 75,
    width: 75,
    margin: 10,
    marginBottom: 0,
  },
  introTextContainer: {
    whiteSpace: 'pre-wrap',
  },
};

function Skills(props) {
  const { header } = props;
  const [data, setData] = useState<any>(null);

  const renderSkillsIntro = (intro) => (
    <h4 style={styles.introTextContainer as any}>
      {/* biome-ignore lint/correctness/noChildrenProp: <explanation> */}
      <ReactMarkdown children={intro} />
    </h4>
  );

  useEffect(() => {
    fetch(endpoints.skills, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />
      {data ? (
        <Fade>
          <div className="section-content-container">
            <Container>
              {renderSkillsIntro(data.intro)}
              {data.skills?.map((rows) => (
                <div key={rows.title}>
                  {rows.show === undefined || rows.show ? (
                    <>
                      <br />
                      <h3>{rows.title}</h3>
                      {rows.items.map((item) => (
                        <div key={item.title} style={{ display: 'inline-block' }}>
                          <img
                            style={styles.iconStyle}
                            src={item.icon}
                            alt={item.title}
                          />
                          <p>{item.title}</p>
                        </div>
                      ))}
                    </>
                  ) : null}
                </div>
              ))}
            </Container>
          </div>
        </Fade>
      ) : <FallbackSpinner /> }
    </>
  );
}

Skills.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Skills;
