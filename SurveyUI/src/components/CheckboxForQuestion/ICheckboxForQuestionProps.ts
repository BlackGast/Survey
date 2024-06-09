import { ISurveyModel } from "../../../../SurveyCore/src/model/ISurveyModel";

export interface ICheckboxForQuestionProps {
    checked: boolean;
    survey: ISurveyModel;
    pageId: number;
    questionId: number;
    editRequired: (required: boolean) => void;
    editCurrentRequiredItem: (required: boolean, pageId: number, questionId: number) => void;
}