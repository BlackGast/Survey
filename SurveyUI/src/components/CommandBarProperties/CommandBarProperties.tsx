import { CommandBarButton, IButtonProps } from "@fluentui/react";
import * as React from "react";
import { ICommandBarPropertiesProps } from "./ICommandBarPropertiesProps";
import { addPageIcon, editPen, more, trashCan } from "../IProps/IIconProps";

export class CommandBarProperties extends React.Component<
  IButtonProps & ICommandBarPropertiesProps,
  {}
> {
  public render(): React.ReactNode {
    const { disabled, checked } = this.props;

    const editCurrentItem = (): void => {
      if (this.props.item === "page") {
        this.props.editCurrentItem("page", this.props.pageId);
        this.props.editCurrentPropertyItem(
          this.props.survey.pages[this.props.pageId ?? 0].title,
          this.props.survey.pages[this.props.pageId ?? 0].description
        );
      }
      if (this.props.item === "survey") {
        this.props.editCurrentItem("survey");
        this.props.editCurrentPropertyItem(
          this.props.survey.title,
          this.props.survey.description
        );
      }
      if (this.props.item === "question") {
        this.props.editCurrentItem(
          "question",
          this.props.pageId,
          this.props.questionId
        );
        this.props.editCurrentPropertyItem(
          this.props.survey.pages[this.props.pageId ?? 0].panels[0].questions[
            this.props.questionId ?? 0
          ].title,
          undefined,
          this.props.survey.pages[this.props.pageId ?? 0].panels[0].questions[
            this.props.questionId ?? 0
          ].required,
          this.props.itemQuestion,
          this.props.pageId,
          this.props.questionId
        );
      }
    };

    const deleteItem = (): void => {
      if (this.props.item === "page") {
        if (this.props.deletePage) {
          this.props.deletePage(this.props.pageId);
        }
      }
      if (this.props.item === "question") {
        this.props.deleteQuestion(this.props.questionId, this.props.pageId);
      }
    };

    const addPage = (): void => {
      if (this.props.addPage) {
        this.props.addPage(this.props.survey.pages.length)
      }
      //this.props.addPage(this.props.survey.pages.length);
    };

    if (this.props.item === "page") {
      return (
        <div>
          <CommandBarButton
            disabled={disabled}
            checked={checked}
            iconProps={more}
            menuProps={{
              items: [
                {
                  key: "editProperties",
                  text: "Редактирование",
                  iconProps: editPen,
                  onClick: () => {
                    editCurrentItem();
                    const prevItemPage = document.getElementsByClassName(
                      "container_page active-page ms-depth-8"
                    );
                    const prevItem = document.getElementsByClassName(
                      "container_page_question active-item ms-depth-8"
                    );
                    if (prevItem.length !== 0) {
                      prevItem[0].classList.value =
                        "container_page_question ms-depth-4";
                    }
                    if (prevItemPage.length !== 0) {
                      prevItemPage[0].classList.value =
                        "container_page ms-depth-4";
                    }
                    const itemPage = document.getElementById(
                      `page-${this.props.pageId ?? 0}`
                    );
                    if (itemPage) {
                      itemPage.className =
                        "container_page active-page ms-depth-8";
                    }
                  },
                },
                {
                  key: "deleteItem",
                  text: "Удалить страницу",
                  iconProps: trashCan,
                  onClick: () => {
                    deleteItem();
                  },
                },
              ],
            }}
          />
        </div>
      );
    }
    if (this.props.item === "question") {
      return (
        <div>
          <CommandBarButton
            disabled={disabled}
            checked={checked}
            iconProps={more}
            style={{ backgroundColor: "#deecf9" }}
            menuProps={{
              items: [
                {
                  key: "editProperties",
                  text: "Редактирование",
                  iconProps: editPen,
                  onClick: () => {
                    editCurrentItem();
                    const prevItem = document.getElementsByClassName(
                      "container_page_question active-item ms-depth-8"
                    );
                    const prevItemPage = document.getElementsByClassName(
                      "container_page active-page ms-depth-8"
                    );
                    if (prevItemPage.length !== 0) {
                      prevItemPage[0].classList.value =
                        "container_page ms-depth-4";
                    }
                    if (prevItem.length !== 0) {
                      prevItem[0].classList.value =
                        "container_page_question ms-depth-4";
                    }
                    const item = document.getElementById(
                      `question-${this.props.pageId ?? 0}-${
                        this.props.questionId ?? 0
                      }`
                    );
                    if (item) {
                      item.className =
                        "container_page_question active-item ms-depth-8";
                    }
                  },
                },
                {
                  key: "deleteItem",
                  text: "Удалить вопрос",
                  iconProps: trashCan,
                  onClick: () => {
                    deleteItem();
                  },
                },
              ],
            }}
          />
        </div>
      );
    }
    if (this.props.item === "survey") {
      return (
        <div>
          <CommandBarButton
            disabled={disabled}
            checked={checked}
            iconProps={more}
            style={{ backgroundColor: "#eff6fc" }}
            menuProps={{
              items: [
                {
                  key: "editProperties",
                  text: "Редактирование",
                  iconProps: editPen,
                  onClick: () => {
                    editCurrentItem();
                    const prevItemPage = document.getElementsByClassName(
                      "container_page active-page ms-depth-8"
                    );
                    const prevItem = document.getElementsByClassName(
                      "container_page_question active-item ms-depth-8"
                    );
                    if (prevItem.length !== 0) {
                      prevItem[0].classList.value =
                        "container_page_question ms-depth-4";
                    }
                    if (prevItemPage.length !== 0) {
                      prevItemPage[0].classList.value =
                        "container_page ms-depth-4";
                    }
                  },
                },
                {
                  key: "deleteItem",
                  text: "Добавить страницу",
                  iconProps: addPageIcon,
                  onClick: () => {
                    addPage();
                  },
                },
              ],
            }}
          />
        </div>
      );
    }
  }
}
