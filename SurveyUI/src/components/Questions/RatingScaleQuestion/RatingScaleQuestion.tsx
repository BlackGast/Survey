import React from "react";
import "../Question.scss";
import { IRatingScaleQuestion } from "./IRaitingScaleQuestion";
import { Label } from "@fluentui/react";
import { CommandBarProperties } from "../../CommandBarProperties/CommandBarProperties";

export class RatingScaleQuestion extends React.Component<IRatingScaleQuestion> {
  private questions =
    this.props.survey.pages[this.props.pageId].panels[0].questions[
      this.props.id
    ];
  private delete = () => {
    this.props.deleteQuestion(this.props.id, this.props.pageId);
  };
  private ratingNum(): React.ReactNode {
    const maxValue: number = this.questions.getPropertyByName("maxNum");
    const itemPool: React.ReactNode[] = [];
    for (let i = 0; i < maxValue; i++) {
      const element: React.ReactNode = <>{i + 1}</>;
      itemPool.push(element);
    }
    return (
      <>
        {itemPool.map((element, index) => (
          <div className="question_number-items_item" key={index}>
            {element}
          </div>
        ))}
      </>
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
        <Label id="questionName" required className="question-label_title_name">
          {this.questions.title}
        </Label>
      );
    }
  }

  public render(): React.ReactNode {
    return (
      <div
        className="container_page_question ms-depth-4"
        id={`question-${this.props.pageId}-${this.props.id}`}
      >
        <div className="question-label">
          <div className="question-label_title">
            {this.props.id + 1}
            {"."}
            {this.requiredSymbol()}
          </div>
          <div className="question-label_type">Тип: Rating scale question</div>
        </div>
        <div className="question_number-items">{this.ratingNum()}</div>
        <div className="question_settings">
          <CommandBarProperties
            item="question"
            itemQuestion="Number"
            survey={this.props.survey}
            pageId={this.props.pageId}
            questionId={this.props.id}
            deleteQuestion={this.delete}
            editCurrentItem={this.props.editCurrentItem}
            editCurrentPropertyItem={this.props.editCurrentPropertyItem}
            currentItem={this.props.currentItem}
          />
        </div>
      </div>
    );
  }
}
