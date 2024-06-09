import { ISurveyModel } from "../../../../SurveyCore/src/model/ISurveyModel";
import { QuestionType } from "../../../../SurveyCore/src/model/QuestionType";
import { ICurrentItem } from "../../model/ICurrentItem";

export interface ISurveyPageProps {
  survey: ISurveyModel;
  addQuestion: (key: QuestionType) => void;
  deleteQuestion: (key?: number) => void;
  deletePage: (key?: number) => void;
  addPage: () => void;
  editCurrentItem: (item?: string, pageId?: number, questionId?: number) => void;
  editCurrentPropertyItem: (title?: string, description?: string, required?: boolean) => void;
  currentItem?: ICurrentItem;
}
