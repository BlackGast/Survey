import { QuestionType } from "../../../../SurveyCore/src/model/QuestionType";

export interface IButtonAddQuestionProps {
  addQuestion: (
    key: QuestionType,
    page: number,
    panel: number,
    questionId: number
  ) => void;
  pageIndex?: number;
  questionId?: number;
}
