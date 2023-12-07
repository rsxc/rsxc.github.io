import React, { useEffect, useState, useContext } from 'react';
import { SocialIcon } from 'react-social-icons';
import endpoints from '../constants/endpoints';

const styles = {
  iconStyle: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
};

function Social() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.social, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <div className="social">
      {data ? data.social.map((social) => (
        <SocialIcon
          key={social.network}
          style={styles.iconStyle}
          href={social.href}
          network={social.network}
          target="_blank"
          rel="noopener"
        />
      )) : null}
    </div>
  );
}

export default Social;
