import * as React from "react";
import { DefaultButton, IContextualMenuProps } from "@fluentui/react";
import {
  calendar,
  checkBox,
  radioBtn,
  ratingStar,
  textDocument,
} from "../IProps/IIconProps";
import { QuestionType } from "../../../../SurveyCore/src/model/QuestionType";
import { IButtonAddQuestionProps } from "./IButtonAddQuestionProps";
import { IButtonProps } from "./IButtonProps";

export class ButtonAddQuestion extends React.Component<
  IButtonProps & IButtonAddQuestionProps
> {
  private addQuest = (key: QuestionType): void => {
    if (this.props.pageIndex === undefined) {
      this.props.addQuestion(
        key,
        this.props.pageIndex ?? 0,
        0,
        this.props.questionId ?? 0
      );
    } else {
      this.props.addQuestion(
        key,
        this.props.pageIndex ?? 0,
        0,
        (this.props.questionId ?? 0) + 1
      );
    }
  };

  private menuProps: IContextualMenuProps = {
    items: [
      {
        id: "Text",
        key: "textQuestion",
        text: "Text",
        iconProps: textDocument,
        onClick: () => {
          this.addQuest("Text");
        },
      },
      {
        id: "Select",
        key: "checkboxesQuestion",
        text: "Checkboxes",
        iconProps: checkBox,
        onClick: () => {
          this.addQuest("Select");
        },
      },
      {
        id: "Choice",
        key: "radioBtnQuestion",
        text: "Radio Button Text",
        iconProps: radioBtn,
        onClick: () => {
          this.addQuest("Choice");
        },
      },
      {
        id: "Date",
        key: "dateQuestion",
        text: "Date",
        iconProps: calendar,
        onClick: () => {
          this.addQuest("Date");
        },
      },
      {
        id: "Number",
        key: "ratingScaleQuestion",
        text: "Rating Scale",
        iconProps: ratingStar,
        onClick: () => {
          this.addQuest("Number");
        },
      },
    ],
  };
  render(): React.ReactNode {
    return (
      <DefaultButton
        text="Добавить вопрос"
        split
        splitButtonAriaLabel="See 2 options"
        aria-roledescription="split button"
        menuProps={this.menuProps}
        disabled={this.props.disabled}
        checked={this.props.checked}
        onClick={() => this.addQuest("Text")}
      />
    );
  }
}
