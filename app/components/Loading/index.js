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

/*

  TODO: 아래 Loading 컴포넌트를 함수형 컴포넌트로 수정하고, `/spec/Loading.spec.js`에 테스트 내용을 보강하세요.

 */
class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: props.text,
    };
  }

  componentDidMount() { // 컴포넌트가 마운트되었을 때
    const { speed, text } = this.props;

    this.interval = window.setInterval(() => {
      this.state.content === text + "..."
        ? this.setState({ content: text })
        : this.setState(({ content }) => ({ content: content + "." }));
    }, speed);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    return <p style={styles.content}>{this.state.content}</p>;
  }
}

export default function Loading2 ({ speed, text }) {
  const [content, setContent] = useState(text);

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (content === text + '...') {
        setContent(text);
      } else {
        setContent(content + '.');
      }
    }, speed);

    return function () {
      window.clearInterval(interval);
    }
  });

  return (
    <p style={styles.content}>{content}</p>
  );
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
};

Loading.defaultProps = {
  text: "Loading",
  speed: 300,
};

Loading2.defaultProps = {
  text: "Loading",
  speed: 300,
};
