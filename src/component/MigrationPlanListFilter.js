import React from "react";

import { DropdownButton, MenuItem, SplitButton, select } from "patternfly-react";



export default class MigrationPlanListFilter extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        inputFilter: ""
      }
    }

    handleChange = (e) => {
      this.setState({
        inputFilter: e.target.value
      })
      this.props.onChange(e.target.value)
    }


    render() {
      return (
        <div>
          <label htmlFor="filter">Filter by Source Container ID: </label>
          <input type="text" id="inputFilter"
            value={this.state.inputFilter}
            onChange={this.handleChange}/>
        </div>
        )
    }
}
