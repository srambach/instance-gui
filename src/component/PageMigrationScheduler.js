import React, { Component } from 'react';
import * as Datetime from 'react-datetime';
import moment from 'moment'

export default class PageMigrationScheduler extends Component {
    constructor(props){
        super(props);
        //this.disableScheduleTime();
        this.state = {
          dateTimeInput:false,
          dateTimePickerOpen:false
        };

    }

    setCallbackUrl = (event) =>{
        this.props.setCallbackUrl(event.target.value);
    }

    disableScheduleTime = () =>{
        console.log('disable scheduleTime');
//        var scheduleTime = document.getElementById("PageMigrationScheduler_scheduleTime")
//        console.log('disable scheduleTime' + scheduleTime.value);
//        scheduleTime.disabled = true;
//        scheduleTime.value='';

        this.setState({
            dateTimeInput:false,
            dateTimePickerOpen:false
         });
         this.props.setScheduleStartTime('');
    }

    enableScheduleTime = () =>{
        console.log('enable scheduleTime');
        //document.getElementById("PageMigrationScheduler_scheduleTime").disabled = false;
        this.setState({
            dateTimeInput:true,
            dateTimePickerOpen:true
         });
    }

    handleDateTimeInput = (inputMoment) =>{
        if (moment(inputMoment,"YYYY-MM-DDTHH:mm:ss", true).isValid()){
            console.log('handleDateTimeInput, valid moment: ' + inputMoment.toDate());
    //        this.props.setScheduleStartTime(inputMoment.format("YYYY/MM/DD hh:mm:ss a"));
    //2019-01-30T13:00:00-05:00        this.props.setScheduleStartTime(inputMoment.format(moment.ISO_DATE_TIME));
    //2019-01-30T18:00:00.000Z         this.props.setScheduleStartTime(inputMoment.toISOString());
    //2019-01-30T18:00:00.000Z            this.props.setScheduleStartTime(inputMoment.toDate());
            this.props.setScheduleStartTime(inputMoment.toDate());
        }else{
            //just ignore the user input
            console.log('handleDateTimeInput, not valid moment: ' + inputMoment);
        }
    }

    validDate = (current) =>{
        var yesterday = Datetime.moment().subtract( 1, 'day' );
        return current.isAfter(yesterday);
    }

  render() {

    return (
        <div className="form-horizontal">

            <table border="0" width="100%" height="30%">
              <tbody>
              <tr>
                  <td width="30%"/>
                  <td width="40%" align="left">
                      Callback URL: <input type="text" name="callbackUrl" onChange={this.setCallbackUrl}/>
                </td>
                <td width="40%"/>
              </tr>
                <tr>
                    <td width="30%"/>
                    <td width="40%" align="left">
                        <input type="radio" name="timeType" value="1" defaultChecked onClick={this.disableScheduleTime}/>Run Migration Now
                    </td>
                    <td width="30%"/>
                </tr>
                <tr>
                    <td width="30%"/>
                    <td width="40%" align="left">
                        <input type="radio" name="timeType" value="2" onClick={this.enableScheduleTime}/>Schedule Migration
                        <Datetime id="PageMigrationScheduler_scheduleTime"
                            input={this.state.dateTimeInput}
                            open={this.state.dateTimePickerOpen}
                            onChange={this.handleDateTimeInput}
                            isValidDate={this.validDate }
                        />
                  </td>
                  <td width="40%"/>
                </tr>

              </tbody>
            </table>

        </div>

    );
  }
}
