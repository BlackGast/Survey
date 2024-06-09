import React from "react";
import "../Question.scss";
import { IDateQuestionPreviewProps } from "./IDateQuestionPreviewProps";
import { DatePicker, Label, defaultDatePickerStrings } from "@fluentui/react";

export class DateQuestionPreview extends React.Component<IDateQuestionPreviewProps> {
  private questions =
    this.props.survey.pages[this.props.pageId].panels[0].questions[
      this.props.id
    ];
  private requiredSymbol(): React.ReactNode {
    if (this.questions.required === false) {
      return (
        <Label id="questionName" className="question-label_title_name">
          {this.questions.title}
        </Label>
      );
    }
    if (this.questions.required === true) {
      return (
        <Label id="questionName" className="question-label_title_name" required>
          {this.questions.title}
        </Label>
      );
    }
  }

  public render(): React.ReactNode {
    return (
      <div className="container_page_question">
        <div className="question-label">
          <div className="question-label_title">
            {this.props.id + 1}
            {"."}
            {this.requiredSymbol()}
          </div>
        </div>
        <div className="question-textfield">
          <DatePicker
            placeholder="Выберите дату..."
            ariaLabel="Select a date"
            strings={defaultDatePickerStrings}
            id={`answer-${this.props.pageId}-${this.props.id}`}
            onSelectDate={(date) => {
              const formattedDate = date?.toLocaleDateString("ru-RU");
              this.props.setAnswer(
                formattedDate,
                this.props.survey.pages[this.props.pageId].panels[0].questions[
                  this.props.id
                ].id
              );
            }}
          />
        </div>
      </div>
    );
  }
}
