import { ISurveyModel } from "../../../../SurveyCore/src/model/ISurveyModel";
import { IEasyModel } from "../PagePreviewSurvey/EasyAnswerModel/model/IEasyModel";

export interface IQuestionPreviewBaseProps {
    id: number;
    pageId: number;
    survey: ISurveyModel;
    answerModel: IEasyModel;
    easyModel: IEasyModel;
    idStr: string;
    setAnswer: (
        answer?: string,
        id?: string
    ) => void;
}