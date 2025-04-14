import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {sp} from "@pnp/sp/presets/all";

import * as strings from 'SubmitFormWebPartStrings';
import SubmitForm from './components/SubmitForm';
import { ISubmitFormProps } from './components/ISubmitFormProps';

export interface ISubmitFormWebPartProps {
  ListName: string;
}

export default class SubmitFormWebPart extends BaseClientSideWebPart<ISubmitFormWebPartProps> {
  protected onInit(): Promise<void> {
    return super.onInit().then(_=> {
      sp.setup({
        spfxContext:this.context 
      })
    });
  }

  public render(): void {
    const element: React.ReactElement<ISubmitFormProps> = React.createElement(
      SubmitForm,
      {
        ListName:this.properties.ListName,
        siteUrl:this.context.pageContext.web.absoluteUrl,
        context:this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('ListName', {
                  label: strings.ListFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
