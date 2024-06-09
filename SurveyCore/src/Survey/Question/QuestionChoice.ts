import { IChoice } from "../../model/formElements/IChoice";
import { IQuestionData } from "../../model/IQuestionData";
import { Utils } from "../Utils";
import { QuestionBase } from "./QuestionBase";

export class QuestionChoice extends QuestionBase {
    public isMultiple: boolean;
    private choices: IChoice[];

    constructor(data: IQuestionData) {
        super(data);
        this.type = 'Choice';
        this.title = data.title || '';
        this.required = data.required || false;
        this.isMultiple = true;
        this.answer = '';
        this.choices = this.createChoice(data.choices);
    }

    private createChoice(data: IChoice[]) {
        const choice: IChoice[] = [];
        if (data?.length) {
            for (const element of data) {
                const choiceObj: IChoice = {
                    id: Utils.generateGUID(),
                    title: element.title || 'Ответ',
                    checked: element.checked || false,
                    disabled: element.disabled || false,
                }
                choice.push(choiceObj);
            }
        }
        return choice;
    }

    public override getValue(): IChoice[] {
        let choices: IChoice[] = [];
        if (this.choices?.length) {
            choices = [...this.choices];
        }
        return choices;
    }

    public override setFieldByName(fieldName: string, newValue: any, index: number) {
        if (index >= 0 && index < this.choices.length) {
            const choice = this.choices[index];
            if (fieldName in choice) {
                choice[fieldName] = newValue;
            }
        }
    }

    public override setValue(newValue: any) {
        this.answer = newValue;
    }

    public addChoice() {
        const choiceObj: IChoice = {
            id: Utils.generateGUID(),
            title: 'Ответ',
            checked: false,
            disabled: false,
        };
        this.choices.push(choiceObj);
    }

    public override deleteChoice(itemId: number): void {
        this.choices.splice(itemId, 1);
    }
}