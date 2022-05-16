import React, { Component } from "react";
import "./styles.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      quotes: [],
      index: 0,
      isLoading: false
    };
  }
  componentDidMount() {
    const url = "https://type.fit/api/quotes";
    fetch(url)
      .then((res) => res.json())
      .then((data) =>
        setTimeout(() => {
          this.setState({ quotes: data, isLoading: true });
        }, 1000)
      );
  }

  handleNext = () => {
    const { index, quotes } = this.state;

    if (index < quotes.length - 1) {
      this.setState({ index: index + 1 });
    }
  };

  handlePrev = () => {
    const { index } = this.state;
    if (index > 0) {
      this.setState({ index: index - 1 });
    }
  };

  render() {
    const { quotes, index, isLoading } = this.state;

    const customClass = quotes[index]?.author ? "" : "no-author";
    console.log("quotes", quotes);

    const content = isLoading ? (
      <>
        <p id="quote">
          <i>"{quotes[index].text}"</i>
        </p>
        <p id="author" className={customClass}>
          {" "}
          {quotes[index].author ? quotes[index].author : "No Author "}
        </p>
        <div className="btns">
          <button id="prev" onClick={this.handlePrev}>
            Previous
          </button>
          <button id="next" onClick={this.handleNext}>
            Next
          </button>
          <p className="page">
            {index + 1}/{quotes.length}
          </p>
        </div>
      </>
    ) : (
      <i className="fa fa-spinner fa-spin" style={{ fontSize: "48px" }}></i>
    );
    return (
      <div className="App">
        <div className="container">{content}</div>
      </div>
    );
  }
}

export default App;
