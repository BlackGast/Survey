import * as React from "react";
import "./PagePreviewSurvey.scss";
import { IPagePreviewSurveyProps } from "./IPagePreviewSurveyProps";
import { QuestionType } from "../../../../SurveyCore/src/model/QuestionType";
import { TextQuestionPreview } from "../Questions/TextQuestionPreview/TextQuestionPreview";
import { IPagePreviewSurveyState } from "./IPagePreviewSurveyState";
import { CheckboxQuestionPreview } from "../Questions/CheckboxQuestionPreview/CheckboxQuestionPreview";
import {
  DefaultButton,
  FontWeights,
  Modal,
  getId,
  getTheme,
  mergeStyleSets,
} from "@fluentui/react";
import { back, forward } from "../IProps/IIconProps";
import { RadioButtonQuestionPreview } from "../Questions/RadioButtonQuestionPreview/RadioButtonQuestionPreview";
import { RatingScaleQuestionPreview } from "../Questions/RatingScaleQuestionPreview/RatingScaleQuestionPreview";
import { DateQuestionPreview } from "../Questions/DateQuestionPreview/DateQuestionPreview";
import { IQuestion } from "./EasyAnswerModel/model/IQuestion";
import { ListTabsAnswer } from "./ListTabsAnswer/ListTabsAnswer";
import EasyAnswerModel from "./EasyAnswerModel/EasyAnswerModel";
import { IEasyModel } from "./EasyAnswerModel/model/IEasyModel";

export class PagePreviewSurvey extends React.Component<
  IPagePreviewSurveyProps,
  IPagePreviewSurveyState
> {
  constructor(props: IPagePreviewSurveyProps) {
    super(props);
    this.state = {
      currentPage: 0,
      easyAnswerModel: {
        title: "",
        answer: [],
      },
      showModal: false,
      errorState: false,
    };
  }

  private requiredPool: IQuestion[] = [];
  private errorPool: boolean = false;
  private easyNewModel: EasyAnswerModel = new EasyAnswerModel();
  private easyModel: IEasyModel = {
    title: "",
    answer: [],
  };

  componentDidMount(): void {
    this.createAnswerObj();
    this.saveAnswerModel();
  }

  private createAnswerObj(): void {
    this.easyNewModel.createModel(this.props.survey);
    this.easyNewModel.setTitle(this.props.survey.title);
    this.easyModel = this.easyNewModel.getModel();
  }

  private checkRequired(): void {
    this.errorPool = false;
    this.props.survey.pages[this.state.currentPage].panels[0].questions.map(
      (element) => {
        if (element.required === true) {
          this.requiredPool.push(element);
        }
      }
    );
    this.requiredPool.map((element) => {
      this.easyModel.answer.map((item) => {
        if (
          element.id === item.id &&
          element.required === true &&
          item.answer === "Нет ответа"
        ) {
          this.errorPool = true;
          this._showModal();
        }
      });
    });
  }

  private theme = getTheme();
  private styles = mergeStyleSets({
    container: {
      display: "flex",
      flexFlow: "column nowrap",
      alignItems: "stretch",
    },
    header: [
      this.theme.fonts.xLarge,
      {
        flex: "1 1 auto",
        borderTop: `4px solid ${this.theme.palette.themePrimary}`,
        color: this.theme.palette.neutralPrimary,
        display: "flex",
        alignItems: "center",
        fontWeight: FontWeights.semibold,
        padding: "12px 12px 14px 24px",
      },
    ],
    heading: {
      color: this.theme.palette.neutralPrimary,
      fontWeight: FontWeights.semibold,
      fontSize: "inherit",
      margin: "0",
    },
    body: {
      flex: "4 4 auto",
      padding: "0 24px 24px 24px",
      overflowY: "hidden",
      selectors: {
        p: { margin: "14px 0" },
        "p:first-child": { marginTop: 0 },
        "p:last-child": { marginBottom: 0 },
      },
    },
  });

  private _titleId: string = getId("title");
  private _subtitleId: string = getId("subText");

  private _showModal = (): void => {
    this.setState({ showModal: true });
  };

  private _closeModal = (): void => {
    this.setState({ showModal: false });
  };

  private renderQuestion(
    item: QuestionType,
    id: number,
    pageId: number,
    idStr: string
  ): React.ReactNode {
    switch (item) {
      case "Text":
        return (
          <TextQuestionPreview
            id={id}
            pageId={pageId}
            survey={this.props.survey}
            setAnswer={this.setAnswer}
            answerModel={this.state.easyAnswerModel}
            easyModel={this.easyModel}
            idStr={idStr}
          />
        );
      case "Select":
        return (
          <CheckboxQuestionPreview
            id={id}
            pageId={pageId}
            survey={this.props.survey}
            setAnswer={this.setAnswer}
            answerModel={this.state.easyAnswerModel}
            easyModel={this.easyModel}
            addChoices={this.addChoices}
            idStr={idStr}
          />
        );
      case "Choice":
        return (
          <RadioButtonQuestionPreview
            id={id}
            pageId={pageId}
            survey={this.props.survey}
            setAnswer={this.setAnswer}
            answerModel={this.state.easyAnswerModel}
            easyModel={this.easyModel}
            idStr={idStr}
          />
        );
      case "Date":
        return (
          <DateQuestionPreview
            id={id}
            pageId={pageId}
            survey={this.props.survey}
            setAnswer={this.setAnswer}
            answerModel={this.state.easyAnswerModel}
            easyModel={this.easyModel}
            idStr={idStr}
          />
        );
      case "Number":
        return (
          <RatingScaleQuestionPreview
            id={id}
            pageId={pageId}
            survey={this.props.survey}
            setAnswer={this.setAnswer}
            answerModel={this.state.easyAnswerModel}
            easyModel={this.easyModel}
            idStr={idStr}
          />
        );
      default:
        break;
    }
  }

  private renderPage(pageId: number): React.ReactNode {
    if (this.props.survey.pages.length === this.state.currentPage) {
      return (
        <div className="preview-container_page ms-depth-4">
          <ListTabsAnswer easyAnswerModel={this.easyModel} />
          {this.renderNavButton()}
        </div>
      );
    }
    if (this.props.survey.pages.length !== this.state.currentPage) {
      const page = this.props.survey.pages[pageId];
      const panel = this.props.survey.pages[pageId].panels[0];

      return (
        <div className="preview-container_page ms-depth-4">
          <div className="preview-container_page_block">
            <div className="preview-container_page_header">
              <label
                id="pageTitle"
                className="preview-container_page_header_title"
              >
                {pageId + 1} {page.title}
              </label>
              <label
                id="pageDescription"
                className="preview-container_page_header_description"
              >
                {page.description}
              </label>
            </div>
          </div>
          {panel.questions.map((elements, indexQuestion) => (
            <div
              className="question-item"
              key={elements.id}
              id={`${indexQuestion}`}
            >
              {this.renderQuestion(
                panel.questions[indexQuestion].type,
                indexQuestion,
                pageId,
                elements.id
              )}
            </div>
          ))}
          {this.renderNavButton()}
        </div>
      );
    }
  }

  private renderNavButton(): React.ReactNode {
    const page = this.props.survey.pages;
    if (this.state.currentPage === 0) {
      return (
        <DefaultButton
          iconProps={forward}
          style={{ marginBottom: "10px" }}
          onClick={() => {
            this.checkRequired();
            if (this.errorPool === true) {
              return;
            }
            if (this.errorPool === false) {
              this.setState((prevState) => ({
                currentPage: prevState.currentPage + 1,
              }));
              this.saveAnswerModel();
            }
          }}
        />
      );
    }

    if (this.state.currentPage === page.length) {
      return (
        <DefaultButton
          iconProps={back}
          style={{ marginBottom: "10px" }}
          onClick={() => {
            this.setState((prevState) => ({
              currentPage: prevState.currentPage - 1,
            }));
            this.saveAnswerModel();
            this.delChoices(this.state.currentPage - 1);
          }}
        />
      );
    }

    return (
      <>
        <DefaultButton
          iconProps={back}
          style={{ marginBottom: "10px", marginRight: "5px" }}
          onClick={() => {
            this.setState((prevState) => ({
              currentPage: prevState.currentPage - 1,
            }));
            this.saveAnswerModel();
            this.delChoices(this.state.currentPage - 1);
          }}
        />
        <DefaultButton
          iconProps={forward}
          style={{ marginBottom: "10px", marginLeft: "5px" }}
          onClick={() => {
            this.checkRequired();
            if (this.errorPool === true) {
              return;
            }
            if (this.errorPool === false) {
              this.errorPool = false;
              this.setState((prevState) => ({
                currentPage: prevState.currentPage + 1,
              }));
              this.saveAnswerModel();
            }
          }}
        />
      </>
    );
  }

  private setAnswer(answer?: string, id?: string): void {
    this.easyModel.answer.map((element) => {
      if (element.id === id) {
        element.answer = answer ?? "";
      }
    });
  }

  private addChoices(answer?: string, id?: string): void {
    this.easyModel.answer.map((element) => {
      if (element.id === id) {
        element.answer += ` ${answer}`;
      }
    });
  }
  private delChoices(pageId?: number): void {
    this.props.survey.pages[pageId ?? 0].panels[0].questions.map((element) => {
      this.easyModel.answer.map((item) => {
        if (element.id === item.id) {
          item.answer = "Нет ответа";
        }
      });
    });
  }

  private saveAnswerModel(): void {
    this.setState({
      easyAnswerModel: this.easyModel,
    });
  }

  public render(): React.ReactNode {
    const survey = this.props.survey;
    const page = this.props.survey.pages;
    if (page.length === 0) {
      return (
        <div className="preview-container">
          <div className="preview-container_title-survey">
            <p>Опрос пустой</p>
          </div>
        </div>
      );
    }
    if (page.length !== 0) {
      return (
        <div>
          <div className="preview-container">
            <div className="preview-container_title-survey">
              <div className="preview-container_title-survey_block">
                <label
                  className="preview-container_title-survey_block_title"
                  id="surveyTitle"
                >
                  {survey.title}
                </label>
                <label
                  id="surveyDescription"
                  className="preview-container_title-survey_block_description"
                >
                  {survey.description}
                </label>
              </div>
              <hr />
              {this.renderPage(this.state.currentPage)}
              <Modal
                titleAriaId={this._titleId}
                isOpen={this.state.showModal}
                onDismiss={this._closeModal}
                isBlocking={false}
                containerClassName={this.styles.container}
              >
                <div className={this.styles.header}>
                  <span id={this._titleId}>Ошибка</span>
                </div>
                <div id={this._subtitleId} className={this.styles.body}>
                  <p>Заполните обязательные поля</p>
                </div>
                <DefaultButton
                  onClick={this._closeModal}
                  text="Close"
                  style={{ margin: "20px" }}
                />
              </Modal>
            </div>
          </div>
        </div>
      );
    }
  }
}
