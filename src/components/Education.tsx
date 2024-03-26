import { useEffect, useState, useContext } from "react";
import { Container } from "react-bootstrap";
import Fade from "react-reveal";
import { ThemeContext } from "styled-components";
import endpoints from "../constants/endpoints.ts";
import Header from "./Header.tsx";
import FallbackSpinner from "./FallbackSpinner.tsx";
import "../css/education.css";

function Education(props) {
  const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(endpoints.education, {
      method: "GET",
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
          <div className={`section-content-container ${theme.isDark ? "dark" : "light"}`}>
            <Container className="flex flex-col items-center gap-8 px-4 py-20 md:pt-28">
              {data.education.map((education) => (
                <div key={education.icon.src} className="flex flex-col items-center gap-2 w-full md:w-2/3">
                  <img src={education.icon.src} alt={education.icon.alt} className="mx-auto w-50" />
                  <p className={`text-center text-2xl font-semibold ${theme.textClass}`}>{education.title}</p>
                  <h1 className={`text-3xl font-bold ${theme.textClass}`}>{education.cardTitle}</h1>
                  <p className={`text-xl ${theme.textClass}`}>{education.cardSubtitle} </p>
                  <ul className="flex flex-col gap-2">
                    {education.cardDetailedText.map((degree) => (
                      <li className={`text-lg ${theme.textClass}`}>{degree}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </Container>
          </div>
        </Fade>
      ) : (
        <FallbackSpinner />
      )}
    </>
  );
}

export default Education;
