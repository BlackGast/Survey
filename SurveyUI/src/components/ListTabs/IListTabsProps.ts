import { ISurveyModel } from "../../../../SurveyCore/src/model/ISurveyModel";
import { QuestionType } from "../../../../SurveyCore/src/model/QuestionType";
import { ICurrentItem } from "../../model/ICurrentItem";
import { ICurrentPropertyItem } from "../../model/ICurrentPropertyItem";

export interface IListTabsProps {
  survey: ISurveyModel;
  currentItem: ICurrentItem;
  currentPropertyItem: ICurrentPropertyItem;
  deleteQuestion: (key?: number) => void;
  addQuestion: (key?: QuestionType) => void;
  deletePage: (key?: number) => void;
  addPage: () => void;
  saveModel: () => void;
  editCurrentItem: () => void;
  editCurrentPropertyItem: () => void;
  editCurrentRequiredItem: () => void;
  setItemSurvey: () => void;
  parseStrToSurvey: () => void;
}
