import "./App.scss";
import { Layout } from "./pages/Layout/Layout";
import * as React from "react";
import { PartialTheme, ThemeProvider } from "@fluentui/react";
import { initializeIcons } from "@fluentui/font-icons-mdl2";
import { ISurveyModel } from "../../SurveyCore/src/model/ISurveyModel";
import { IPageData } from "../../SurveyCore/src/model/IPageData";
import { IPanelData } from "../../SurveyCore/src/model/IPanelData";
import { IQuestionData } from "../../SurveyCore/src/model/IQuestionData";
import { QuestionType } from "../../SurveyCore/src/model/QuestionType";
import Survey from "../../SurveyCore/src/Survey/Survey";
import { DataManager } from "../../SurveyCore/src/DataManager/DataManager";
import { Page } from "../../SurveyCore/src/Survey/Page/Page";
import { ListTabs } from "./components/ListTabs/ListTabs";
import { IAppState } from "./IAppState";
initializeIcons();

const appTheme: PartialTheme = {
  palette: {},
};

// https://github.com/microsoft/fluentui/wiki/Getting-Started-with-Fluent-UI-React
export class App extends React.Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      surveyModel: {
        description: "",
        pages: [],
        title: "",
      },
      currentItem: {
        pageId: 0,
        questionId: 0,
        item: "survey",
      },
      currentPropertyItem: {
        title: "",
        description: "",
        required: false,
        choices: [],
      },
      required: false,
    };
  }

  private dataManager: DataManager = new DataManager();
  private newModel: Survey = new Survey(this.dataManager);
  private surveyModel: ISurveyModel = {
    description: "",
    pages: [],
    title: "",
  };
  /**
   *
   * Функция добавления вопроса
   * @param key Тип вопроса
   * @param page Номер страницы
   * @param panel Номер панели
   * @param questionId Номер вопроса
   */
  private addQuestion = (
    key?: QuestionType,
    page?: string,
    panel?: string,
    questionId?: number
  ): void => {
    if (this.surveyModel.pages.length === 0) {
      this.addPage();
      this.addPanel();
    }

    const newEmptyQuestion: IQuestionData = {
      order: (questionId ?? 0).toString(),
      id: "",
      title: "Название вопроса",
      type: key ?? "Text",
    };
    this.surveyModel.pages[parseInt(page ?? "0")].panels[
      parseInt(panel ?? "0")
    ].addQuestion(newEmptyQuestion);
    this.surveyModel.pages[parseInt(page ?? "0")].panels[
      parseInt(panel ?? "0")
    ].order = (questionId ?? 0).toString();

    this.saveModel();
  };
  /**
   * Функция добавления страницы
   * @param pageId Номер страницы
   */
  private addPage = (pageId?: number): void => {
    const emptyPage: IPageData = {
      order: (pageId ?? 0).toString(),
      title: "Страница",
      panels: [],
      id: "",
      description: "Описание страницы",
    };
    if (this.surveyModel.pages.length === 0) {
      this.newModel.createModel();
      this.surveyModel = this.newModel.getModel();
      this.surveyModel.title = "Название опроса";
      this.surveyModel.description = "Описание опроса";
      this.surveyModel.pages[0].title = "Страница";
      this.surveyModel.pages[0].description = "Описание страницы";
      this.saveModel();
    } else {
      const newPage = new Page(emptyPage);
      this.surveyModel.pages.push(newPage);
      this.addPanel(this.surveyModel.pages.length - 1);
      this.addQuestion("Text", (this.surveyModel.pages.length - 1).toString());
      this.saveModel();
    }
  };
  /**
   * Функция добавления панели
   * @param page Номер страницы
   */
  private addPanel(page?: number): void {
    const emptyPanel: IPanelData = {
      order: "",
      id: "",
      title: "",
      description: "",
      questions: [],
    };
    if (this.surveyModel?.pages[page ?? 0].panels.length === 0) {
      this.surveyModel?.pages[page ?? 0].addPanel(emptyPanel);
      this.saveModel();
    }
  }

  /**
   * Функция удаления вопроса
   * @param key Номер вопроса
   * @param page Номер страницы
   */
  private handleDeleteQuestion = (key?: number, page?: number): void => {
    this.surveyModel.pages[page ?? 0].panels[0].questions.splice(key ?? 0, 1);
    this.setState({
      currentItem: {
        pageId: 0,
        questionId: 0,
        item: "survey",
      },
    });
    if (this.surveyModel.pages[page ?? 0].panels[0].questions.length === 0) {
      this.handleDeletePage(page);
    }
    this.saveModel();
  };

  /**
   * Функция удаления вопроса
   * @param page Номер вопроса
   */
  private handleDeletePage = (page?: number): void => {
    this.surveyModel.pages.splice(page ?? 0, 1);
    this.setState({
      surveyModel: this.surveyModel,
      currentItem: {
        pageId: 0,
        questionId: 0,
        item: "survey",
      },
    });
    this.saveModel();
  };

  /**
   * Функция сохранения модели в состояние
   */
  private saveModel = (): void => {
    this.setState({
      surveyModel: this.surveyModel,
    });
  };

  /**
   * Функция для выбора объекта, которое будет изменяться в PropertyPanel
   * @param item Название переданного объекта (survey, page, question)
   * @param pageId Номер страницы
   * @param questionId Номер вопроса
   */
  private editCurrentItem = (
    item?: string,
    pageId?: number,
    questionId?: number
  ): void => {
    this.setState({
      currentItem: {
        item: item ?? "survey",
        pageId: pageId ?? 0,
        questionId: questionId ?? 0,
      },
    });
  };

  /**
   * Функция изменения Property у currentPropertyItem
   * @param title Название
   * @param description Описание
   * @param required Обязательность элемента
   * @param typeQuestion Тип вопроса
   * @param pageId Номер страницы
   * @param questionId Номер вопроса
   */
  private editCurrentPropertyItem = (
    title?: string,
    description?: string,
    required?: boolean,
    typeQuestion?: QuestionType,
    pageId?: number,
    questionId?: number
  ): void => {
    this.setState({
      currentPropertyItem: {
        title: title ?? "",
        description: description ?? "",
        required: required ?? false,
        choices: this.addChoice(pageId, questionId, typeQuestion),
      },
    });
  };

  /**
   * Функция для изменения обязательности вопроса
   * @param required Булевое значение обязательности
   * @param pageId Номер страницы
   * @param questionId Номер вопроса
   */
  private editCurrentRequiredItem = (
    required?: boolean,
    pageId?: number,
    questionId?: number
  ): void => {
    this.surveyModel.pages[pageId ?? 0].panels[0].questions[
      questionId ?? 0
    ].required = required ?? false;
  };

  /**
   * Функция добавления списка ответов для одного вопроса
   * @param pageId Номер страницы
   * @param questionId Номер вопроса
   * @param typeQuestion Тип вопроса
   * @returns Возвращает массив состоящий из ответов
   */
  private addChoice = (
    pageId?: number,
    questionId?: number,
    typeQuestion?: QuestionType
  ): string[] => {
    const choices: string[] = [];
    if (typeQuestion === "Select" || typeQuestion === "Choice") {
      const elementsPool: any =
        this.surveyModel.pages[pageId ?? 0].panels[0].questions[
          questionId ?? 0
        ].getValue();
      elementsPool.map((element: any) => choices.push(element.title));
    }
    return choices;
  };

  private setItemSurvey = (
    title?: string,
    description?: string,
    pageId?: number
  ): void => {
    if (pageId === undefined) {
      this.surveyModel.title = title ?? "";
      this.surveyModel.description = description ?? "";
    }
    if (pageId !== undefined) {
      this.surveyModel.pages[pageId].title = title ?? "";
      this.surveyModel.pages[pageId].description = description ?? "";
    }
  };

  /**
   * Функция для парсинга JSON из строки в объект
   * @param strSurvey JSON строка
   */
  private parseStrToSurvey = (strSurvey?: string): void => {
    this.newModel.createModel(strSurvey);
    this.surveyModel = this.newModel.getModel();
    this.saveModel();
  };

  public render(): React.ReactNode {
    return (
      <ThemeProvider theme={appTheme} style={{ height: "100%" }}>
        <Layout>
          {
            <div className="bodyPage">
              <ListTabs
                survey={this.state.surveyModel}
                currentItem={this.state.currentItem}
                currentPropertyItem={this.state.currentPropertyItem}
                addQuestion={this.addQuestion}
                deleteQuestion={this.handleDeleteQuestion}
                deletePage={this.handleDeletePage}
                addPage={this.addPage}
                saveModel={this.saveModel}
                editCurrentItem={this.editCurrentItem}
                editCurrentPropertyItem={this.editCurrentPropertyItem}
                editCurrentRequiredItem={this.editCurrentRequiredItem}
                setItemSurvey={this.setItemSurvey}
                parseStrToSurvey={this.parseStrToSurvey}
              />
            </div>
          }
        </Layout>
      </ThemeProvider>
    );
  }
}
