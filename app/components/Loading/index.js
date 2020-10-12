import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const styles = {
  content: {
    fontSize: "35px",
    position: "absolute",
    left: "0",
    right: "0",
    marginTop: "20px",
    textAlign: "center",
  },
};

export default function Loading ({ speed, text }) {
  const [content, setContent] = useState(text);

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (content === text + '...') {
        setContent(text);
      } else {
        setContent(content + '.');
      }
    }, speed);

    return () => {
      window.clearInterval(interval);
    }
  });

  return (
    <p style={styles.content}>{content}</p>
  );
}

Loading.propTypes = {
  text: PropTypes.string,
  speed: PropTypes.number,
};

Loading.defaultProps = {
  text: "Loading",
  speed: 300,
};
