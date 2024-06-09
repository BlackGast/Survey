import React from "react";
import { ICheckboxQuestionPreviewProps } from "./ICheckboxQuestionPreviewProps";
import { Checkbox, Label, Stack } from "@fluentui/react";
import { IChoice } from "../../../../../SurveyCore/src/model/formElements/IChoice";

export class CheckboxQuestionPreview extends React.Component<ICheckboxQuestionPreviewProps> {
  private questions =
    this.props.survey.pages[this.props.pageId].panels[0].questions[
      this.props.id
    ];
  private answerPool: string[] = [];
  private outputSelects(): React.ReactNode {
    const elementsPool: IChoice[] = this.questions.getValue() as IChoice[];
    const stackTokens = { childrenGap: 10 };
    return (
      <Stack tokens={stackTokens} style={{ paddingLeft: "10px" }}>
        {elementsPool.map((element: IChoice) => (
          <Checkbox
            key={element.id}
            label={element.title}
            onChange={() => {
              let redactor: boolean = false;
              this.props.answerModel.answer.map((item) => {
                if (
                  item.id === this.props.idStr &&
                  item.answer === "Нет ответа"
                ) {
                  this.props.setAnswer("", this.props.idStr);
                }
              });
              if (this.answerPool.length > 0) {
                this.answerPool.map((item, indexItem) => {
                  if (item === element.title) {
                    this.answerPool.splice(indexItem, 1);
                    redactor = true;
                  }
                });
              }
              if (this.answerPool.length === 0 && redactor === false) {
                this.answerPool.push(element.title);
              }
              if (
                this.answerPool.length !== 0 &&
                redactor === false &&
                element.title !== this.answerPool[0]
              ) {
                this.answerPool.push(element.title);
              }
              redactor = false;
              this.props.addChoices(element.title, this.props.idStr);
              this.props.setAnswer(
                this.answerPool.toString(),
                this.props.idStr
              );
              if (this.answerPool.length < 1) {
                this.props.setAnswer(
                  "Нет ответа",
                  this.props.idStr
                );
              }
            }}
          />
        ))}
      </Stack>
    );
  }

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
        {this.outputSelects()}
      </div>
    );
  }
}
