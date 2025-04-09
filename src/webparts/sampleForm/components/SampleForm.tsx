import * as React from 'react';
// import styles from './SampleForm.module.scss';
import type { ISampleFormProps } from './ISampleFormProps';
import { PrimaryButton,DefaultButton ,Checkbox,Label, Stack, ChoiceGroup, Dropdown} from '@fluentui/react';
const stackTokesn={childrenGap:5}
export default class SampleForm extends React.Component<ISampleFormProps> {
  public render(): React.ReactElement<ISampleFormProps> {
   

    return (
     <>
<PrimaryButton text="Save" iconProps={{iconName:'save'}}/>&nbsp;&nbsp;&nbsp;&nbsp;
<DefaultButton text ="Deafult" iconProps={{iconName:'contact'}}/>&nbsp;&nbsp;&nbsp;&nbsp;
<PrimaryButton text="Edit" iconProps={{iconName:'edit'}}/>
<Label>Qualification Information:</Label>
<Stack tokens={stackTokesn}>
<Checkbox label='Post Graduate'/>
<Checkbox label=' Graduate'/>
<Checkbox label='HSC'/>
<Checkbox label='SSC'/>
</Stack>
<Label>Gender</Label>
<ChoiceGroup
options={[
  {key:'Male',text:'Male'},
  {key:'Female',text:'Female'}
]}
/>
<Label>Department</Label>
<Dropdown
placeholder='Select an option'
options={[
  {key:'HR',text:'HR'},
  {key:'IT',text:'IT'},
  {key:'Finance',text:'Finance'},
  {key:'Admin',text:'Admin'},
  {key:'Marketing',text:'Marketing'},
]}
multiSelect
defaultSelectedKeys={['IT','Finance']}
/>
     </>
    );
  }
}
