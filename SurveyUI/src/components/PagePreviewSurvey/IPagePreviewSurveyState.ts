import { IEasyModel } from "./EasyAnswerModel/model/IEasyModel";

export interface IPagePreviewSurveyState {
    currentPage: number;
    showModal: boolean;
    errorState: boolean;
    easyAnswerModel: IEasyModel;
}