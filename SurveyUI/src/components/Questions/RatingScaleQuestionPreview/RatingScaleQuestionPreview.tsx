import React from "react";
import "../Question.scss";
import { IRatingScaleQuestionPreviewProps } from "./IRatingScaleQuestionPreviewProps";
import { Label } from "@fluentui/react";
import { IRatingScaleQuestionPreviewState } from "./IRatingScaleQuestionPreviewState";

export class RatingScaleQuestionPreview extends React.Component<
  IRatingScaleQuestionPreviewProps,
  IRatingScaleQuestionPreviewState
> {
  constructor(props: IRatingScaleQuestionPreviewProps) {
    super(props);
    this.state = {
      selectedNum: 0,
    };
  }
  private questions =
    this.props.survey.pages[this.props.pageId].panels[0].questions[
      this.props.id
    ];
  private ratingNum(): React.ReactNode {
    const maxValue: number = this.questions.getPropertyByName("maxNum");
    const itemPool: React.ReactNode[] = [];
    for (let i = 0; i < maxValue; i++) {
      const element: React.ReactNode = <>{i + 1}</>;
      const buttonClassName =
        i + 1 <= this.state.selectedNum
          ? "question_number-items_item-preview selected"
          : "question_number-items_item-preview";
      itemPool.push(
        <button
          className={buttonClassName}
          key={i}
          onClick={(e) => {
            const button = e.target as HTMLButtonElement;
            this.setState({
              selectedNum: Number(button.innerText),
            });
            this.props.setAnswer(
              button.innerText,
              this.props.survey.pages[this.props.pageId].panels[0].questions[
                this.props.id
              ].id
            );
          }}
        >
          {element}
        </button>
      );
    }
    return <>{itemPool}</>;
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
        <div className="question_number-items">{this.ratingNum()}</div>
      </div>
    );
  }
}
