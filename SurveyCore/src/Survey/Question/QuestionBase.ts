import { IQuestionData } from "../../model/IQuestionData";
import { QuestionType } from "../../model/QuestionType";
import { Utils } from "../Utils";


export class QuestionBase implements IQuestionData {
    public order: string;
    public id: string;
    public title: string;
    public type: QuestionType;
    public required: boolean;
    public answer: string;

    constructor(data: IQuestionData) {
        this.order = data.order || '';
        this.id = data.id || Utils.generateGUID();
        this.type = 'Text';
        this.title = '';
        this.answer = '';
        this.required = data.required || false;
    }

    /**
     * Базовый метод для редактирования чойза в списке ответов. Предназначено для типов вопросов Choice и Select.
     */
    public deleteChoice(itemId: number) { /* TODO document why this method 'setChoise' is empty */ }

    /**
     * Базовый метод для добавления чойза в список ответов. Предназначено для типов вопросов Choice и Select.
     */
    public addChoice() { /* TODO document why this method 'addChoise' is empty */ }

    /**
     * Базовый метод для получения значения ответа.
     */
    public getValue?()

    /**
     * Базовый метод для изменения значения ответа.
     */
    public setValue(newValue: any) { /* TODO document why this method 'setValue' is empty */ }

    /**
     * Базовый метод для изменения одного из полей класса по названию.
     */
    public setPropertyByName(name: string, value: any) {
        this[name as keyof this] = value;
    }

    /**
     * Базовый метод получения значения поля.
     */
    public getPropertyByName(name: string): any {
        return this[name as keyof this];
    }

    public setFieldByName(fieldName: string, newValue: any, index: number) { /* TODO document why this method 'setFieldByName' is empty */ }

    /**
     * Колбэк, который будет вызывать метод из контекста, в котором выполняется Survey.
     */
    public onChange() { }
}