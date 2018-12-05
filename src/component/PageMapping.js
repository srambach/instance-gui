import React, { Component } from 'react';
import { Button } from "patternfly-react";


import PageMappingDiagrams from "./PageMappingDiagrams";
import DropdownNode from './DropdownNode'


export default class PageMapping extends Component {
  constructor (props) {
    super(props);
    this.state = {
                  sourceNodeStr: '',
                  targetNodeStr: '',
                  sourceDiagramshown: false,
                  targetDiagramshown: false
                };
    this.handleSourceDropdownChange = this.handleSourceDropdownChange.bind(this);
    this.handleTargetDropdownChange = this.handleTargetDropdownChange.bind(this);
    this.handleSourceDiagramButtonClick = this.handleSourceDiagramButtonClick.bind(this);
    this.handleTargetDiagramButtonClick = this.handleTargetDiagramButtonClick.bind(this);
    this.handleMapButtonClick = this.handleMapButtonClick.bind(this);

    //console.log("this.props.sourceInfo.nodesForDropdown " + this.props.sourceInfo.nodesForDropdown);
    //console.log("this.props.targetInfo.nodesForDropdown " + this.props.targetInfo.nodesForDropdown);

  }


  handleSourceDiagramButtonClick(){
    console.log('handleSourceDiagramButtonClick sourceDiagramshown ' + this.state.sourceDiagramshown)
    this.setState({
			sourceDiagramshown: !this.state.sourceDiagramshown
		});
  }

  handleTargetDiagramButtonClick(){
    console.log('handleTargetDiagramButtonClick targetDiagramshown ' + this.state.targetDiagramshown)
    this.setState({
			targetDiagramshown: !this.state.targetDiagramshown
		});
  }

  handleSourceDropdownChange(option){
    let tmpPreviousSelector = this.state.sourceCurrentSelector;
    //let tmpCurrentSelector = "#"  + option.value + "undefined";
    let tmpCurrentSelector = "#"  + option + "_shapeType_BACKGROUND";
    this.setState({
      sourceNodeStr: option,
      sourcePreviousSelector: tmpPreviousSelector,
      sourceCurrentSelector: tmpCurrentSelector,
      sourceDiagramshown: true,
      targetDiagramshown: false
    });

  }



  handleTargetDropdownChange(option){
    let tmpPreviousSelector = this.state.targetCurrentSelector;
    let tmpCurrentSelector = "#"  + option + "_shapeType_BACKGROUND";
    //let tmpCurrentSelector = "#"  + option.value;

    //let tmpCurrentSelector = "[bpmn2nodeid=" + option.value + "]";
    //console.log('TargetDropdown selected ', tmpCurrentSelector);

    this.setState({
      targetNodeStr: option,
      targetPreviousSelector: tmpPreviousSelector,
      targetCurrentSelector: tmpCurrentSelector,
      sourceDiagramshown: false,
      targetDiagramshown: true
    });

  }

  handleMapButtonClick(){
      if (this.state.sourceNodeStr.length >0 && this.state.targetNodeStr.length >0 )
      {
          var currentNodeMapping = '"' + this.state.sourceNodeStr + '"' + ":" + '"' + this.state.targetNodeStr + '"';
          console.log("handleMapButtonClick currentNodeMapping1 ", currentNodeMapping);

          var input = document.getElementById("nodeMappingField");
          var currentInputValue = input.value;
          //remove {} before add new node mapping values
          currentInputValue = currentInputValue.replace(/{/g, '');
          currentInputValue = currentInputValue.replace(/}/g, '');
          if (currentInputValue.length > 0)
          {
            currentInputValue = currentInputValue + "," + currentNodeMapping;
          }else{
            currentInputValue = currentNodeMapping;
          }

          currentInputValue = '{' + currentInputValue + '}';

          var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;
          nativeInputValueSetter.call(input, currentInputValue);

          //once fired the event, this currentInputValue will be saved in the wizard form's values
          var ev2 = new Event('input', { bubbles: true});
          input.dispatchEvent(ev2);

      }



  }

  MappingButton (){
      return <Button bsStyle="primary" onClick={this.handleMapButtonClick}>Map these two nodes</Button>;
  };



  render() {



   const sourceValues = this.props.sourceInfo.values;
   const sourceLabels = this.props.sourceInfo.labels;
   const sourceNode = [];
   if (this.props.sourceInfo !== null  && this.props.sourceInfo !== ''){

       for (var i = 0; i < sourceValues.length; i++){
           sourceNode.push({value:sourceValues[i],label:sourceLabels[i]});
       }

       //const sourceNode = [{value:'_D3E17247-1D94-47D8-93AD-D645E317B736',label:'Self Evaluation:_D3E17247-1D94-47D8-93AD-D645E317B736'},{value:'_E35438DF-03AF-4D7B-9DCB-30BC70E7E92E',label:'PM Evaluation:_E35438DF-03AF-4D7B-9DCB-30BC70E7E92E'},{value:'_AB431E82-86BC-460F-9D8B-7A7617565B36',label:'HR Evaluation:_AB431E82-86BC-460F-9D8B-7A7617565B36'},{value:'_B8E4DA1E-A62B-49C2-9A94-FEE5F5FD2B4E',label:'Input:_B8E4DA1E-A62B-49C2-9A94-FEE5F5FD2B4E'}];
       //const targetNode = [{value:'_D3E17247-1D94-47D8-93AD-D645E317B736',label:'Self Evaluation:_D3E17247-1D94-47D8-93AD-D645E317B736'},{value:'_E35438DF-03AF-4D7B-9DCB-30BC70E7E92E',label:'PM Evaluation:_E35438DF-03AF-4D7B-9DCB-30BC70E7E92E'},{value:'_AB431E82-86BC-460F-9D8B-7A7617565B36',label:'HR Evaluation:_AB431E82-86BC-460F-9D8B-7A7617565B36'},{value:'_B8E4DA1E-A62B-49C2-9A94-FEE5F5FD2B4E',label:'Input:_B8E4DA1E-A62B-49C2-9A94-FEE5F5FD2B4E'}];
       const targetValues = this.props.targetInfo.values;
       const targetLabels = this.props.targetInfo.labels;
       const targetNode = [];
       for (var i = 0; i < targetValues.length; i++){
           targetNode.push({value:targetValues[i],label:targetLabels[i]});
       }


        return (

        <div className="form-horizontal">
            <div className="form-group">
              <label>Source: {this.props.sourceInfo.processId}</label>
                    <DropdownNode
                      options={sourceNode}
                      title='Source Nodes '
                      onDropdownChange={this.handleSourceDropdownChange}
                    />

                    <label>Target: {this.props.targetInfo.processId}</label>
                    <DropdownNode
                      options={targetNode}
                      title='Target Nodes '
                      onDropdownChange={this.handleTargetDropdownChange}
                    />
                    {this.MappingButton()}
            </div>

            <div className="form-group">
                    <label >Use below text field to update mappings directly, like delete a wrong mapping:</label>

                    <textarea className="form-control" name="mappings" id="nodeMappingField" rows="2" />


            </div>

            <PageMappingDiagrams
              sourceCurrentSelector={this.state.sourceCurrentSelector}
              sourcePreviousSelector={this.state.sourcePreviousSelector}

              targetCurrentSelector={this.state.targetCurrentSelector}
              targetPreviousSelector={this.state.targetPreviousSelector}

              sourceDiagramButtonClick={this.handleSourceDiagramButtonClick}
              targetDiagramButtonClick={this.handleTargetDiagramButtonClick}

              sourceDiagramshown={this.state.sourceDiagramshown}
              targetDiagramshown={this.state.targetDiagramshown}

              sourceInfo={this.props.sourceInfo} targetInfo={this.props.targetInfo}
            />


        </div>

        );


   }else{
       //no process info retrived from backend yet, just display an empty tag to avoid error.
       return (<div/>);
   }


  }
}
