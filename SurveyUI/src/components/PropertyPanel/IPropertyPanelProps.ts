import { ISurveyModel } from "../../../../SurveyCore/src/model/ISurveyModel";
import { ICurrentPropertyItem } from "../../model/ICurrentPropertyItem";

export interface IPropertyPanelProps {
  survey: ISurveyModel;
  pageId: number;
  questionId: number;
  item: string;
  propertyItem: ICurrentPropertyItem;
  saveModel: () => void;
  editCurrentPropertyItem: (
    title?: string,
    description?: string,
    required?: boolean,
    typeQuestion?: string,
    pageId?: number,
    questionId?: number) => void;
  editCurrentRequiredItem: (required?: boolean, pageId?: number, questionId?: number) => void;
  setItemSurvey: (title?: string, description?: string, pageId?: number) => void;
  editCurrentItem: (item?: string, pageId?: number, questionId?: number) => void;
}
