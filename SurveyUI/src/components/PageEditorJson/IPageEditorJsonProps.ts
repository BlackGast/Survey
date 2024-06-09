import { ISurveyModel } from "../../../../SurveyCore/src/model/ISurveyModel";

export interface IPageEditorJsonProps {
    survey: ISurveyModel;
    parseStrToSurvey: (strSurvey: string) => void
}