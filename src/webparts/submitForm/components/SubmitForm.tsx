import * as React from 'react';
import { ISubmitFormState } from './ISubmitFormState';
import type { ISubmitFormProps } from './ISubmitFormProps';
import { Web } from '@pnp/sp/webs';
import { TextField,PrimaryButton } from '@fluentui/react';
export default class SubmitForm extends React.Component<ISubmitFormProps,ISubmitFormState> {
  constructor(props:ISubmitFormProps){
    super(props);
    this.state={
      Name:"",
      Email:"",
      Age:""
    }
  }
  //Create Item
  public async createItem(){
    let web=Web(this.props.siteUrl);
    await web.lists.getByTitle(this.props.ListName).items.add({
      Title:this.state.Name,
      EmailAddress:this.state.Email,
      Age:parseInt(this.state.Age)
    })
    .then((response)=>{
      console.log("No Error found");
      alert("Item create successfully");
      this.setState({
        Name:"",
        Email:"",
        Age:""
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
     <br/>
     <PrimaryButton text ="Submit" onClick={()=>this.createItem()} iconProps={{iconName:"Save"}}/>
     </>
    );
  }
}
