import * as React from "react";
import { IPageEditorJsonProps } from "./IPageEditorJsonProps";
import {
  DefaultButton,
  FontWeights,
  Modal,
  TextField,
  getId,
  mergeStyleSets,
  getTheme,
} from "@fluentui/react";
import { IPageEditorJsonState } from "./IPageEditorJsonState";

export class PageEditorJson extends React.Component<
  IPageEditorJsonProps,
  IPageEditorJsonState
> {
  constructor(props: IPageEditorJsonProps) {
    super(props);
    this.state = {
      surveyStr: "",
      showModal: false,
    };
  }

  componentDidMount(): void {
    this.setState({ surveyStr: JSON.stringify(this.props.survey, null, "\t") });
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

  public render(): React.ReactNode {
    if (this.props.survey.pages.length === 0) {
      return (
        <div className="preview-container">
          <div className="preview-container_title-survey">
            <p>Опрос пустой</p>
          </div>
        </div>
      );
    } else {
      return (
        <>
          <div>
            <TextField
              value={this.state.surveyStr}
              multiline
              resizable={false}
              rows={40}
              onChange={(e) => {
                this.setState({ surveyStr: e.currentTarget.value });
              }}
            />
          </div>
          <DefaultButton
            style={{ marginTop: "10px" }}
            text="Сохранить"
            onClick={() => {
              try {
                this.props.parseStrToSurvey(this.state.surveyStr);
              } catch (error) {
                this._showModal();
              }
            }}
          />
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
              <p>Ошибка при изменении/загрузке JSON</p>
            </div>
            <DefaultButton
              onClick={this._closeModal}
              text="Close"
              style={{ margin: "20px" }}
            />
          </Modal>
        </>
      );
    }
  }
}
