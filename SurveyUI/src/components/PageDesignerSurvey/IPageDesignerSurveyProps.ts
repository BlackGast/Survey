import { ISurveyModel } from "../../../../SurveyCore/src/model/ISurveyModel";
import { ICurrentItem } from "../../model/ICurrentItem";
import { ICurrentPropertyItem } from "../../model/ICurrentPropertyItem";

export interface IPageDesignerSurveyProps {
  survey: ISurveyModel;
  currentItem: ICurrentItem;
  currentPropertyItem: ICurrentPropertyItem;
  addQuestion: () => void;
  deleteQuestion: () => void;
  deletePage: () => void;
  addPage: () => void;
  saveModel: () => void;
  editCurrentItem: () => void;
  editCurrentPropertyItem: () => void;
  editCurrentRequiredItem: () => void;
  setItemSurvey: () => void;
}
