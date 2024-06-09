import { Slider } from "@fluentui/react";
import * as React from "react";
import { ISliderForSettingsState } from "./ISliderForSettingsState";
import { ISliderForSettingsProps } from "./ISliderForSettingsProps";

export class SliderForSettings extends React.Component<
  ISliderForSettingsProps,
  ISliderForSettingsState
> {
  public state: ISliderForSettingsState = { value: 0 };

  public render(): JSX.Element {
    const question =
      this.props.survey.pages[this.props.pageId].panels[0].questions[
        this.props.questionId
      ];
    return (
      <Slider
        label="Количество элементов"
        min={2}
        max={9}
        step={1}
        defaultValue={question.getPropertyByName("maxNum")}
        showValue={true}
        onChange={(value: number) => {
          question.setPropertyByName("maxNum", value);
        }}
      />
    );
  }
}
