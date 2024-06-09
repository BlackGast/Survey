import { IEasyAnswerModel } from "./model/IEasyAnswerModel";

export class EasyQuestion implements IEasyAnswerModel {
    id: string;
    title: string;
    answer: string;

    constructor(data: IEasyAnswerModel) {
        this.id = data.id || '';
        this.answer = data.answer || 'Нет ответа';
        this.title = data.title || '';
    }
    public getTitle() {
        return this.title;
    }
    public getAnswer() {
        return this.answer;
    }
    public setAnswer(answer: string) {
        this.answer = answer;
    }
}