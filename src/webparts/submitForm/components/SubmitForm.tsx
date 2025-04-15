import * as React from 'react';
import { ISubmitFormState } from './ISubmitFormState';
import type { ISubmitFormProps } from './ISubmitFormProps';
import { Web } from '@pnp/sp/webs';
import { TextField,PrimaryButton, IDatePickerStrings, DatePicker } from '@fluentui/react';
export default class SubmitForm extends React.Component<ISubmitFormProps,ISubmitFormState> {
  constructor(props:ISubmitFormProps){
    super(props);
    this.state={
      Name:"",
      Email:"",
      Age:"",
      PermanentAddress:"",
      DateOfBirth:""
    }
  }
  //Create Item
  public async createItem(){
    let web=Web(this.props.siteUrl);
    await web.lists.getByTitle(this.props.ListName).items.add({
      Title:this.state.Name,
      EmailAddress:this.state.Email,
      Age:parseInt(this.state.Age),
      Address:this.state.PermanentAddress,
      DOB:new Date(this.state.DateOfBirth)
    })
    .then((response)=>{
      console.log("No Error found");
      alert("Item create successfully");
      this.setState({
        Name:"",
        Email:"",
        Age:"",
        PermanentAddress:"",
        DateOfBirth:""
      });
      return response;
    })
    .catch((err)=>{
      console.log("Error found");
      alert("Error in createing item");
      throw err;
    })
  }
  //event handling
  private handleChange=(fieldValue:keyof ISubmitFormState,value:string|number|boolean):void=>{
    this.setState({[fieldValue]:value}as Pick<ISubmitFormState,keyof ISubmitFormState>);
  }
  public render(): React.ReactElement<ISubmitFormProps> {
   

    return (
     <>
     <TextField value={this.state.Name} label='Name'
     onChange={(_,event)=>this.handleChange("Name",event||"")}
     />
      <TextField value={this.state.Email} label='Email Address'
     onChange={(_,event)=>this.handleChange("Email",event||"")}
     />
      <TextField value={this.state.Age} label='Age'
     onChange={(_,event)=>this.handleChange("Age",event||"")}
     />
      <TextField value={this.state.PermanentAddress} label='Permanent Address'
     onChange={(_,event)=>this.handleChange("PermanentAddress",event||"")}
     multiline
     rows={5}
     />
     <DatePicker
     label='Date of Birth'
     strings={DatePickerStrings}
     onSelectDate={(e)=>this.setState({DateOfBirth:e})}
     formatDate={FormateDate}
     value={this.state.DateOfBirth}
     />
     <br/>
     <PrimaryButton text ="Submit" onClick={()=>this.createItem()} iconProps={{iconName:"Save"}}/>
     </>
    );
  }
}
//Date Formatting
export const DatePickerStrings:IDatePickerStrings={
  months:["January","February","March","April","May","June","July","August","September","October","November","December"],
  shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
  days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
  shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
  goToToday:"Go to today",
  prevMonthAriaLabel:"Previous month",
  nextMonthAriaLabel:"Next month",
  prevYearAriaLabel:"Previous year",
  nextYearAriaLabel:"Next year",

}

export const FormateDate=(date:any):string=>{
  var date1=new Date(date);
  var year=date1.getFullYear();
  var month=(1+date1.getMonth()).toString();
  month=month.length>1?month:"0"+month;
  var day=date1.getDate().toString();
  day=day.length>1?day:"0"+day;
  return month+"/"+day+"/"+year;
}

