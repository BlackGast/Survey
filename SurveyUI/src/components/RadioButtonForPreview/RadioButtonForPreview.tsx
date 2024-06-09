import { ChoiceGroup } from "@fluentui/react";
import React from "react";
import { IRadioButtonForPreviewProps } from "./IRadioButtonForPreviewProps";
import "./ChoiceGroup.scss";

export class RadioButtonForPreview extends React.Component<IRadioButtonForPreviewProps> {
  public render() {
    return (
      <div>
        <ChoiceGroup
          className="defaultChoiceGroup"
          options={this.props.items.map((elements: any, index: number) => ({
            key: `${index}`,
            text: elements.title,
          }))}
          onChange={(e) => {
            this.props.setAnswer(
              e?.currentTarget.nextElementSibling?.textContent ?? "",
              this.props.idStr,
            );
          }}
        />
      </div>
    );
  }
}
