import * as React from "react";
import { DefaultButton, IStackProps, IconButton, Stack, TextField } from "@fluentui/react";
import { IPropertyPanelProps } from "./IPropertyPanelProps";
import { IPropertyPanelState } from "./IPropertyPanelState";
import { CheckboxForQuestion } from "../CheckboxForQuestion/CheckboxForQuestion";
import { trashCan } from "../IProps/IIconProps";
import { SliderForSettings } from "../SliderbarForSettings/SliderForSettings";

export class PropertyPanel extends React.Component<
  IPropertyPanelProps,
  IPropertyPanelState
> {
  constructor(props: IPropertyPanelProps) {
    super(props);
    this.state = {
      checked: false,
      title: this.props.propertyItem.title,
      description: this.props.propertyItem.description,
      choices: [],
    };
  }

  componentDidUpdate(prevProps: IPropertyPanelProps): void {
    if (this.props.propertyItem !== prevProps.propertyItem) {
      this.setState({
        choices: this.props.propertyItem.choices,
        description: this.props.propertyItem.description,
        title: this.props.propertyItem.title,
        checked: this.props.propertyItem.required
      });
    }
  }

  private editCurrentQuestionChoiceItem = (
    indexChoice: number,
    valueTitle: string
  ): void => {
    this.props.survey.pages[this.props.pageId].panels[0].questions[
      this.props.questionId
    ].setFieldByName("title", valueTitle, indexChoice);
  };

  private editRequired = (required: boolean) => {
    this.setState({ checked: required });
  };

  public render(): React.ReactNode {
    const columnProps: Partial<IStackProps> = {
      tokens: { childrenGap: 15 },
      styles: { root: "settings-inp" },
    };
    const question =
      this.props.survey.pages[this.props.pageId].panels[0].questions[
        this.props.questionId
      ];
    if (this.props.survey.pages.length !== 0) {
      if (this.props.item === "survey") {
        return (
          <>
            <p className="settings-lbl">Настройки опроса</p>
            <hr />
            <Stack {...columnProps}>
              <TextField
                label="Название опроса"
                id="title"
                value={this.state.title}
                onChange={(e) => {
                  this.setState({
                    title: e.currentTarget.value,
                  });
                }}
              />
              <TextField
                label="Описание"
                id="description"
                multiline
                rows={2}
                value={this.state.description}
                onChange={(e) => {
                  this.setState({
                    description: e.currentTarget.value,
                  });
                }}
              />
              <DefaultButton
                text="Сохранить"
                onClick={() => {
                  this.props.setItemSurvey(
                    this.state.title,
                    this.state.description
                  );
                  this.props.saveModel();
                }}
              />
            </Stack>
          </>
        );
      }
      if (this.props.item === "page") {
        const pageIndex = this.props.pageId ?? 0;
        return (
          <>
            <p className="settings-lbl">Настройки страницы {pageIndex + 1}</p>
            <hr />
            <Stack {...columnProps}>
              <TextField
                label="Название страницы"
                id="title"
                value={this.state.title}
                onChange={(e) => {
                  this.setState({
                    title: e.currentTarget.value,
                  });
                }}
              />
              <TextField
                label="Описание"
                id="description"
                multiline
                rows={2}
                value={this.state.description}
                onChange={(e) => {
                  this.setState({
                    description: e.currentTarget.value,
                  });
                }}
              />
              <DefaultButton
                text="Сохранить"
                onClick={() => {
                  this.props.setItemSurvey(
                    this.state.title,
                    this.state.description,
                    this.props.pageId
                  );
                  this.props.saveModel();
                }}
              />
            </Stack>
          </>
        );
      }
      if (this.props.item === "question") {
        if (question.type === "Text" || question.type === "Date") {
          return (
            <>
              <p className="settings-lbl">Настройки вопроса</p>
              <hr />
              <Stack {...columnProps}>
                <TextField
                  label="Название вопроса"
                  id="title"
                  value={this.state.title}
                  onChange={(e) => {
                    this.setState({
                      title: e.currentTarget.value,
                    });
                  }}
                />
                <CheckboxForQuestion
                  checked={this.state.checked}
                  survey={this.props.survey}
                  pageId={this.props.pageId}
                  questionId={this.props.questionId}
                  editRequired={this.editRequired}
                  editCurrentRequiredItem={this.props.editCurrentRequiredItem}
                />
                <DefaultButton
                  text="Сохранить"
                  onClick={() => {
                    question.title = (
                      document.getElementById("title") as HTMLInputElement
                    ).value;
                    this.props.editCurrentRequiredItem(
                      this.state.checked,
                      this.props.pageId,
                      this.props.questionId
                    );
                    this.props.saveModel();
                  }}
                />
              </Stack>
            </>
          );
        }
        if (question.type === "Select" || question.type === "Choice") {
          const ItemsValue: any = question.getValue();
          return (
            <>
              <p className="settings-lbl">Настройки вопроса</p>
              <hr />
              <Stack {...columnProps}>
                <TextField
                  label="Название вопроса"
                  id="title"
                  value={this.state.title}
                  onChange={(e) => {
                    this.setState({
                      title: e.currentTarget.value,
                    });
                  }}
                />
                {ItemsValue.map((elements: any, indexChoice: number) => (
                  <div key={elements.id} style={{ display: "flex" }}>
                    <TextField
                      id={`choiceTitle-${indexChoice}`}
                      defaultValue={ItemsValue[indexChoice].title}
                      onChange={(e) => {
                        this.editCurrentQuestionChoiceItem(
                          indexChoice,
                          e.currentTarget.value
                        );
                      }}
                    />
                    <IconButton
                      iconProps={trashCan}
                      onClick={() => {
                        question.deleteChoice(indexChoice);
                        this.props.saveModel();
                      }}
                    />
                  </div>
                ))}
                <DefaultButton
                  text="Добавить ответ"
                  onClick={() => {
                    question.addChoice();
                    this.props.saveModel();
                  }}
                />
                <CheckboxForQuestion
                  checked={this.state.checked}
                  survey={this.props.survey}
                  pageId={this.props.pageId}
                  questionId={this.props.questionId}
                  editRequired={this.editRequired}
                  editCurrentRequiredItem={this.props.editCurrentRequiredItem}
                />
                <DefaultButton
                  text="Сохранить"
                  onClick={() => {
                    question.title = (
                      document.getElementById("title") as HTMLInputElement
                    ).value;
                    this.props.editCurrentRequiredItem(
                      this.state.checked,
                      this.props.pageId,
                      this.props.questionId
                    );
                    this.props.saveModel();
                  }}
                />
              </Stack>
            </>
          );
        }
        if (question.type === "Number") {
          return (
            <>
              <p className="settings-lbl">Настройки вопроса</p>
              <hr />
              <Stack {...columnProps}>
                <TextField
                  label="Название вопроса"
                  id="title"
                  value={`${this.state.title}`}
                  onChange={(e) => {
                    this.setState({
                      title: e.currentTarget.value,
                    });
                  }}
                />
                <SliderForSettings
                  survey={this.props.survey}
                  pageId={this.props.pageId}
                  questionId={this.props.questionId}
                />
                <CheckboxForQuestion
                  checked={this.state.checked}
                  survey={this.props.survey}
                  pageId={this.props.pageId}
                  questionId={this.props.questionId}
                  editRequired={this.editRequired}
                  editCurrentRequiredItem={this.props.editCurrentRequiredItem}
                />
                <DefaultButton
                  text="Сохранить"
                  onClick={() => {
                    question.title = (
                      document.getElementById("title") as HTMLInputElement
                    ).value;
                    this.props.editCurrentRequiredItem(
                      this.state.checked,
                      this.props.pageId,
                      this.props.questionId
                    );
                    this.props.saveModel();
                  }}
                />
              </Stack>
            </>
          );
        }
      }
    }
  }
}
