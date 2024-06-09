import { Checkbox } from "@fluentui/react";
import React from "react";
import { ICheckboxForQuestionProps } from "./ICheckboxForQuestionProps";
import { ICheckboxForQuestionState } from "./ICheckboxForQuestionState";

export class CheckboxForQuestion extends React.Component<
  ICheckboxForQuestionProps,
  ICheckboxForQuestionState
> {
  constructor(props: ICheckboxForQuestionProps) {
    super(props);
    this.state = {
      checked: this.props.checked,
    };
    this._onCheckboxChange = this._onCheckboxChange.bind(this);
  }

  componentDidUpdate(prevProps: ICheckboxForQuestionProps): void {
    if (prevProps.checked !== this.props.checked) {
      this.setState({ checked: this.props.checked });
    }
  }

  private _onCheckboxChange(
    _ev?: React.FormEvent<HTMLElement>,
    checked?: boolean
  ): void {
    this.setState({
      checked: checked ?? false,
    });
    this.props.editRequired(!this.state.checked);
  }

  public render(): React.ReactNode {
    if (this.state.checked === false) {
      return (
        <Checkbox
          label="Обязательно"
          checked={this.state.checked}
          onChange={this._onCheckboxChange}
        />
      );
    }
    if (this.state.checked === true) {
      return (
        <Checkbox
          label="Обязательно"
          checked={this.state.checked}
          onChange={this._onCheckboxChange}
        />
      );
    }
  }
}
