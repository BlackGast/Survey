import { ISurveyModel } from "../../../../SurveyCore/src/model/ISurveyModel";
import { IEasyModel } from "../PagePreviewSurvey/EasyAnswerModel/model/IEasyModel";

export interface IRadioButtonForPreviewProps {
    survey: ISurveyModel;
    items: any;
    idStr: string;
    setAnswer: (answer: string, id: string) => void;
    easyModel: IEasyModel;
}