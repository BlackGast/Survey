import { ISurveyModel } from "../../SurveyCore/src/model/ISurveyModel";
import { ICurrentItem } from "./model/ICurrentItem";
import { ICurrentPropertyItem } from "./model/ICurrentPropertyItem";

export interface IAppState {
  currentItem: ICurrentItem;
  currentPropertyItem: ICurrentPropertyItem;
  required: boolean;
  surveyModel: ISurveyModel;
}