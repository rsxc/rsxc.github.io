import sdk from "@stackblitz/sdk";
import PropTypes from "prop-types";
import { useEffect } from "react";

const Code = () => {
  const embedProject = () => {
    sdk.embedProjectId("embedded-project", "vitejs-vite-uvcuhz", {
      forceEmbedLayout: true,
      openFile: "index.html",
      hideNavigation: true,
      height: window.innerHeight,
      width: window.innerWidth,
      startScript: "nope",
    });
  };

  useEffect(() => {
    embedProject();
  });

  return (
    <div className="z-10">
      <div id="embedded-project"> </div>
    </div>
  );
};

Code.propTypes = {
  projectId: PropTypes.string.isRequired,
  height: PropTypes.number,
};

export default Code;
