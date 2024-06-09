import { ISurveyModel } from "../../../../../SurveyCore/src/model/ISurveyModel";
import { EasyQuestion } from "./EasyQuestion";
import { IEasyModel } from "./model/IEasyModel";

class EasyAnswerModel {
    private _model: IEasyModel;
    constructor() {
        this._model = {
            title: '',
            answer: []
        }
    }
    public createModel(data?: ISurveyModel) {
        if (data) {
            const answers: EasyQuestion[] = [];
            data.pages.map((_page, pageIndex) => {
                data.pages[pageIndex].panels[0].questions.map((question) => {
                    const answerModel = new EasyQuestion(question)
                    answers.push(answerModel);
                })
            })
            this._model.answer = answers;
        }
        return this._model
    }
    public setTitle(title: string) {
        this._model.title = title;
    }
    public getModel() {
        return this._model;
    }
}

export default EasyAnswerModel;