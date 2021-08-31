import React, { Component } from "react";
import { Range } from "rc-slider";
import "rc-slider/assets/index.css";

const SliderLabel = {
    fontSize: "12px",
    lineHeight: "0",
    margin: "0 15px",
    width: "45px",
};

const Track = {
    backgroundColor: "black",
    height: "1px",
    top: "7px",
    boxShadow: "0 0 0 .4px black",
};

const Rail = {
    height: "1px",
    top: "7px",
};

let Handle = {};

if (window.matchMedia("(min-width: 700px)").matches) {
    Handle = {
        backgroundColor: "white",
        border: "1px solid black",
        height: "10px",
        width: "10px",
        top: "7px",
        boxShadow: "0 0 0 .4px black",
    };
} else {
    Handle = {
        backgroundColor: "white",
        border: "1px solid black",
        height: "15px",
        width: "15px",
        top: "5px",
        boxShadow: "0 0 0 .4px black",
    };
}

class RangeSlider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            values: props.values,
        };
    }

    onValueChange(values) {
        this.setState({ values: values });
    }

    render() {
        const { values } = this.state;
        const {
            onSliderChange,
            currency,
            productsFilterSliderValues,
        } = this.props;

        return (
            <>
                <span style={SliderLabel}>
                    {Math.floor(values[0]) + currency}
                </span>
                <Range
                    max={180}
                    step={5}
                    defaultValue={productsFilterSliderValues}
                    onChange={(event) => this.onValueChange(event)}
                    onAfterChange={(event) => onSliderChange(event)}
                    handleStyle={[Handle, Handle]}
                    trackStyle={[Track]}
                    railStyle={Rail}
                />
                <span style={SliderLabel}>
                    {Math.floor(values[1]) + currency}
                </span>
            </>
        );
    }
}

export default RangeSlider;
