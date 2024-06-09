import * as React from "react";
import "./SurveyPage.scss";
import { QuestionType } from "../../../../SurveyCore/src/model/QuestionType";
import { TextQuestion } from "../Questions/TextQuestion/TextQuestion";
import { CheckboxQuestion } from "../Questions/CheckboxQuestion/CheckboxQuestion";
import { RadioButtonQuestion } from "../Questions/RadioButtonQuestion/RadioButtonQuestion";
import { DateQuestion } from "../Questions/DateQuestion/DateQuestion";
import { RatingScaleQuestion } from "../Questions/RatingScaleQuestion/RatingScaleQuestion";
import { ButtonAddQuestion } from "../ButtonAddQuestion/ButtonAddQuestion";
import { ISurveyPageState } from "./ISurveyPageState";
import { ISurveyPageProps } from "./ISurveyPageProps";
import { CommandBarProperties } from "../CommandBarProperties/CommandBarProperties";

export class SurveyPage extends React.Component<
  ISurveyPageProps,
  ISurveyPageState
> {
  private renderQuestion(
    item: QuestionType,
    id: number,
    pageId: number
  ): React.ReactNode {
    switch (item) {
      case "Text":
        return (
          <TextQuestion
            id={id}
            pageId={pageId}
            survey={this.props.survey}
            deleteQuestion={this.props.deleteQuestion}
            editCurrentItem={this.props.editCurrentItem}
            editCurrentPropertyItem={this.props.editCurrentPropertyItem}
            currentItem={this.props.currentItem}
          />
        );
      case "Select":
        return (
          <CheckboxQuestion
            id={id}
            pageId={pageId}
            survey={this.props.survey}
            deleteQuestion={this.props.deleteQuestion}
            editCurrentItem={this.props.editCurrentItem}
            editCurrentPropertyItem={this.props.editCurrentPropertyItem}
            currentItem={this.props.currentItem}
          />
        );
      case "Choice":
        return (
          <RadioButtonQuestion
            id={id}
            pageId={pageId}
            survey={this.props.survey}
            deleteQuestion={this.props.deleteQuestion}
            editCurrentItem={this.props.editCurrentItem}
            editCurrentPropertyItem={this.props.editCurrentPropertyItem}
            currentItem={this.props.currentItem}
          />
        );
      case "Date":
        return (
          <DateQuestion
            id={id}
            pageId={pageId}
            survey={this.props.survey}
            deleteQuestion={this.props.deleteQuestion}
            editCurrentItem={this.props.editCurrentItem}
            editCurrentPropertyItem={this.props.editCurrentPropertyItem}
            currentItem={this.props.currentItem}
          />
        );
      case "Number":
        return (
          <RatingScaleQuestion
            id={id}
            pageId={pageId}
            survey={this.props.survey}
            deleteQuestion={this.props.deleteQuestion}
            editCurrentItem={this.props.editCurrentItem}
            editCurrentPropertyItem={this.props.editCurrentPropertyItem}
            currentItem={this.props.currentItem}
          />
        );
      default:
        break;
    }
  }

  public render(): React.ReactNode {
    const page = this.props.survey.pages;
    if (page.length === 0) {
      return (
        <div>
          <div className="container">
            <div className="container_title-survey">
              <p>Опрос пустой. Нажмите на кнопку "Добавить вопрос."</p>
              <div className="container_button-add-question">
                <ButtonAddQuestion addQuestion={this.props.addQuestion} />
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (page.length !== 0) {
      return (
        <div className="container">
          <div className="container_title-survey">
            <div className="container_title-survey_block">
              <div className="container_title-survey_header">
                <label
                  id="surveyTitle"
                  className="container_title-survey_header_title"
                >
                  {this.props.survey.title}
                </label>
                <label
                  id="surveyDescription"
                  className="container_title-survey_header_description"
                >
                  {this.props.survey.description}
                </label>
              </div>
              <CommandBarProperties
                currentItem={this.props.currentItem}
                item="survey"
                survey={this.props.survey}
                editCurrentItem={this.props.editCurrentItem}
                editCurrentPropertyItem={this.props.editCurrentPropertyItem}
                deletePage={this.props.deletePage}
                deleteQuestion={this.props.deleteQuestion}
                addPage={this.props.addPage}
              />
            </div>
            {page.map((elements, indexPage) => (
              <div
                key={elements.id}
                id={`${indexPage}`}
                style={{ paddingBottom: "10px" }}
              >
                <hr />
                <div
                  className="container_page ms-depth-4"
                  id={`page-${indexPage}`}
                >
                  <div className="container_page_block">
                    <div className="container_page_header">
                      <label
                        id="pageTitle"
                        className="container_page_header_title"
                      >
                        {indexPage + 1} {page[indexPage].title}
                      </label>
                      <label
                        id="pageDescription"
                        style={{ marginBottom: "5px" }}
                      >
                        {page[indexPage].description}
                      </label>
                    </div>
                    <CommandBarProperties
                      item="page"
                      currentItem={this.props.currentItem}
                      survey={this.props.survey}
                      pageId={indexPage}
                      editCurrentItem={this.props.editCurrentItem}
                      editCurrentPropertyItem={
                        this.props.editCurrentPropertyItem
                      }
                      deletePage={this.props.deletePage}
                      deleteQuestion={this.props.deleteQuestion}
                      addPage={this.props.addPage}
                    />
                  </div>
                  {page[indexPage].panels[0].questions.map(
                    (elements, indexQuestion) => (
                      <div
                        className="question-item"
                        key={elements.id}
                        id={`${indexQuestion}`}
                      >
                        {this.renderQuestion(
                          elements.type,
                          indexQuestion,
                          indexPage
                        )}
                      </div>
                    )
                  )}
                  <div className="container_page_under-button">
                    <ButtonAddQuestion
                      addQuestion={this.props.addQuestion}
                      pageIndex={indexPage}
                      questionId={
                        page[indexPage].panels[0].questions.length - 1
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
}
