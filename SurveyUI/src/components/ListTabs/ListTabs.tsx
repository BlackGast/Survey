import * as React from "react";
import { DefaultButton, Pivot, PivotItem } from "@fluentui/react";
import { PageDesignerSurvey } from "../PageDesignerSurvey/PageDesignerSurvey";
import { PageEditorJson } from "../PageEditorJson/PageEditorJson";
import { PagePreviewSurvey } from "../PagePreviewSurvey/PagePreviewSurvey";
import { IListTabsProps } from "./IListTabsProps";
import { ISurveyModel } from "../../../../SurveyCore/src/model/ISurveyModel";

export class ListTabs extends React.Component<
  IListTabsProps,
  { selectedKey: string }
> {
  constructor(props: IListTabsProps) {
    super(props);

    this.state = {
      selectedKey: "designerPage",
    };
  }
  private downloadJSON(obj: ISurveyModel, name: string): void {
    const dataUri =
      "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));
    const anchorElement = document.createElement("a");
    anchorElement.href = dataUri;
    anchorElement.download = `${name}.json`;
    document.body.appendChild(anchorElement);
    anchorElement.click();
    document.body.removeChild(anchorElement);
  }

  public render(): React.ReactNode {
    if (this.props.survey.pages.length < 1) {
      return (
        <>
          <div className="buttonMenu">
            <Pivot
              selectedKey={this.state.selectedKey}
              onLinkClick={this.handleLinkClick}
              headersOnly={true}
            >
              <PivotItem headerText="Редактор опроса" itemKey="designerPage" />
              <PivotItem
                headerText="Предварительный просмотр"
                itemKey="previewPage"
              />
              <PivotItem headerText="Редактор JSON" itemKey="editorJson" />
            </Pivot>
          </div>
          <hr className="no-margin" />
          <div>{this.renderContent(this.state.selectedKey)}</div>
        </>
      );
    } else {
      return (
        <>
          <div className="buttonMenu">
            <Pivot
              selectedKey={this.state.selectedKey}
              onLinkClick={this.handleLinkClick}
              headersOnly={true}
            >
              <PivotItem headerText="Редактор опроса" itemKey="designerPage" />
              <PivotItem
                headerText="Предварительный просмотр"
                itemKey="previewPage"
              />
              <PivotItem headerText="Редактор JSON" itemKey="editorJson" />
            </Pivot>
            <DefaultButton
              text="Сохранить опрос"
              style={{ marginTop: "10px", marginRight: "10px" }}
              onClick={() => {
                this.downloadJSON(this.props.survey, "questions");
              }}
            />
          </div>
          <hr className="no-margin" />
          <div style={{ height: "93.7%" }}>
            {this.renderContent(this.state.selectedKey)}
          </div>
        </>
      );
    }
  }

  private handleLinkClick = (item?: PivotItem) => {
    if (item) {
      this.setState({ selectedKey: item.props.itemKey! });
    }
  };

  private renderContent = (selectedKey: string) => {
    switch (selectedKey) {
      case "designerPage":
        return (
          <PageDesignerSurvey
            survey={this.props.survey}
            currentItem={this.props.currentItem}
            currentPropertyItem={this.props.currentPropertyItem}
            addQuestion={this.props.addQuestion}
            deleteQuestion={this.props.deleteQuestion}
            deletePage={this.props.deletePage}
            addPage={this.props.addPage}
            saveModel={this.props.saveModel}
            editCurrentItem={this.props.editCurrentItem}
            editCurrentPropertyItem={this.props.editCurrentPropertyItem}
            editCurrentRequiredItem={this.props.editCurrentRequiredItem}
            setItemSurvey={this.props.setItemSurvey}
          />
        );
      case "previewPage":
        return <PagePreviewSurvey survey={this.props.survey} />;
      case "editorJson":
        return (
          <PageEditorJson
            survey={this.props.survey}
            parseStrToSurvey={this.props.parseStrToSurvey}
          />
        );
      default:
        return null;
    }
  };
}
