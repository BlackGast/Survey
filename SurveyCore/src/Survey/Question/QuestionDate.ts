import { IQuestionData } from "../../model/IQuestionData";
import { QuestionBase } from "./QuestionBase";
import { Validator } from "../Validator/Validator";

export class QuestionDate extends QuestionBase {

    constructor(data: IQuestionData) {
        super(data);
        this.type = 'Date';
        this.title = data.title || '';
        this.required = data.required || false;
        this.answer = '';
    }

    public override getValue() {
        return this.answer;
    }

    public setValue(newValue: string) {
        if (Validator.validDate(newValue)) {
            this.answer = newValue;
        } else {
            console.log("Ошибка"); //здесь нужно реализовать вывод на экран ошибки с валидацией  
        }
    }
}