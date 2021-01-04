import React from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import './App.css';

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prevDisable: true,
      nextDisable:
        this.refs && this.refs.offsetWidth >= this.refs.scrollWidth
          ? true
          : false,
    };
  }
  componentDidMount() {
    this.checkButtons(this.refs.offsetWidth, this.refs.scrollWidth);
  }
  checkButtons = (offsetWidthValue, scrollWidthValue) => {
    this.setState({
      prevDisable: this.refs.scrollLeft <= 0 ? true : false,
      nextDisable:
        this.refs.scrollLeft + offsetWidthValue >= scrollWidthValue
          ? true
          : false,
    });
  };
  render() {
    const offsetWidthValue = this.refs.offsetWidth,
      scrollWidthValue = this.refs.scrollWidth;
    return (
      <div
        className="slider-container"
        ref={(el) => {
          this.refs = el;
        }}
      >
        <div
          className={`btn-slider prev ${this.state.prevDisable ? "" : ""}`}
          disabled={this.state.prevDisable}
          onClick={() => {
            this.refs.scrollLeft -= offsetWidthValue;
            this.checkButtons(offsetWidthValue, scrollWidthValue);
          }}
        >
          <BsChevronLeft size={30} />
        </div>
        <div className="slider-wrapper">{this.props.children}</div>

        <div
          className={`btn-slider next ${this.state.nextDisable ? "" : ""}`}
          disabled={this.state.nextDisable}
          onClick={() => {
            this.refs.scrollLeft += offsetWidthValue;
            this.checkButtons(offsetWidthValue, scrollWidthValue);
          }}
        >
          <BsChevronRight size={30} />
        </div>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
     <Slider/>
    </div>
  );
}

export default App;
