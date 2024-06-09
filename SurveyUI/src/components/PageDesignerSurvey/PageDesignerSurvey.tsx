import * as React from "react";
import { SurveyPage } from "../SurveyPage/SurveyPage";
import { IPageDesignerSurveyProps } from "./IPageDesignerSurveyProps";
import { IPageDesignerSurveyState } from "./IPageDesignerSurveyState";
import { PropertyPanel } from "../PropertyPanel/PropertyPanel";

export class PageDesignerSurvey extends React.Component<
  IPageDesignerSurveyProps,
  IPageDesignerSurveyState
> {
  public render(): React.ReactNode {
    if (this.props.survey.pages.length === 0) {
      return (
        <div className="bodyPage_colored">
          <SurveyPage
            survey={this.props.survey}
            addQuestion={this.props.addQuestion}
            deleteQuestion={this.props.deleteQuestion}
            deletePage={this.props.deletePage}
            addPage={this.props.addPage}
            editCurrentItem={this.props.editCurrentItem}
            editCurrentPropertyItem={this.props.editCurrentPropertyItem}
          />
        </div>
      );
    } else {
      return (
        <div className="page bodyPage_colored" id="bodyPage">
          <div className="page_part page_part-part2">
            <SurveyPage
              survey={this.props.survey}
              addQuestion={this.props.addQuestion}
              deleteQuestion={this.props.deleteQuestion}
              deletePage={this.props.deletePage}
              addPage={this.props.addPage}
              editCurrentItem={this.props.editCurrentItem}
              editCurrentPropertyItem={this.props.editCurrentPropertyItem}
              currentItem={this.props.currentItem}
            />
          </div>
          <div className="vertical-line" />
          <div className="page_part page_part-part3">
            <PropertyPanel
              survey={{ ...this.props.survey }}
              pageId={this.props.currentItem.pageId}
              questionId={this.props.currentItem.questionId}
              item={this.props.currentItem.item}
              propertyItem={this.props.currentPropertyItem}
              saveModel={this.props.saveModel}
              editCurrentPropertyItem={this.props.editCurrentPropertyItem}
              editCurrentRequiredItem={this.props.editCurrentRequiredItem}
              setItemSurvey={this.props.setItemSurvey}
              editCurrentItem={this.props.editCurrentItem}
            />
          </div>
        </div>
      );
    }
  }
}
