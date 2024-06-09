import React from "react";
import { IListTabsAnswerProps } from "./IListTabsAnswerProps";
import { Pivot, PivotItem } from "@fluentui/react";

export class ListTabsAnswer extends React.Component<IListTabsAnswerProps> {
  private renderTable(): React.ReactNode {
    return (
      <div className="answer-table">
        <table style={{ width: "70%" }}>
          <thead>
            <tr
              className="answer-table_element"
              style={{ background: "white" }}
            >
              <th className="answer-table_element_item">Название</th>
              <th className="answer-table_element_item">Ответ</th>
            </tr>
          </thead>
          <tbody>
            {this.props.easyAnswerModel.answer.map((element) => [
              <tr key={element.id} className="answer-table_element">
                <td className="answer-table_element_item">{element.title}</td>
                <td className="answer-table_element_item">{element.answer}</td>
              </tr>,
            ])}
          </tbody>
        </table>
      </div>
    );
  }

  private renderJson(): React.ReactNode {
    return (
      <pre
        className="answer-table_json"
      >
        {JSON.stringify(this.props.easyAnswerModel, null, 2)}
      </pre>
    );
  }

  render(): React.ReactNode {
    return (
      <div>
        <Pivot aria-label="Tabs of answer" linkFormat="tabs">
          <PivotItem headerText="Таблица">
            <>{this.renderTable()}</>
          </PivotItem>
          <PivotItem headerText="JSON">
            <>{this.renderJson()}</>
          </PivotItem>
        </Pivot>
      </div>
    );
  }
}
