import { IPanelData } from "../../model/IPanelData";
import { IQuestionData } from "../../model/IQuestionData";
import { QuestionBase } from "../Question/QuestionBase";
import { QuestionChoice } from "../Question/QuestionChoice";
import { QuestionDate } from "../Question/QuestionDate";
import { QuestionNumber } from "../Question/QuestionNumber";
import { QuestionSelect } from "../Question/QuestionSelect";
import { QuestionText } from "../Question/QuestionText";
import { Utils } from "../Utils";

/**
 * Используется для группировки вопросов в UI
 */
export class Panel {
    public order: string;
    public id: string;
    public title: string;
    public description: string;
    public columns: number;
    public questions: (QuestionChoice | QuestionDate | QuestionNumber | QuestionSelect | QuestionText)[];

    constructor(data: IPanelData) {
        this.order = data.order || '';
        this.id = data.id || Utils.generateGUID();
        this.title = data.title;
        this.description = data.description;
        this.questions = [];
        this.columns = 1;

        if (typeof data.questions === 'string') {
            const questionData = JSON.parse(data.questions);
            this.addQuestion(questionData);
        } else if (data.questions.length) {
            for (const element of data.questions) {
                this.addQuestion(element)
            }
        }
    }

    public addQuestion = (data: IQuestionData): void => {
        if (data.type === 'Choice') {
            const question = new QuestionChoice(data);
            this.questions.push(question);
        }
        if (data.type === 'Select') {
            const question = new QuestionSelect(data);
            this.questions.push(question);
        }
        if (data.type === 'Text') {
            const question = new QuestionText(data);
            this.questions.push(question);
        }
        if (data.type === 'Number') {
            const question = new QuestionNumber(data);
            this.questions.push(question);
        }
        if (data.type === 'Date') {
            const question = new QuestionDate(data);
            this.questions.push(question);
        }
    }

    public getQuestions(): (QuestionChoice | QuestionDate | QuestionNumber | QuestionSelect | QuestionText)[] {
        return this.questions;
    }

    public getQuestionById(id: string): QuestionBase | undefined {
        return this.questions.find(question => question.id === id);
    }
}