import * as React from "react";
import * as ReactDOM from "react-dom";

import { DropDownList } from "@progress/kendo-react-dropdowns";

class Trial extends React.Component {
  sizes = this.props.data;
  state = {
    value: null
  };

  handleChange = event => {
    this.setState({
      value: event.target.value
    });
  };

  render() {
    console.log("mmm");
    return (
      <div>
        <div className="example-config">Selected Value: {this.state.value}</div>
        <DropDownList
          data={this.sizes}
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
export default Trial;
