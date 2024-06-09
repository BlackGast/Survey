import { IQuestionData } from "../../model/IQuestionData";
import { ISelectAnswer } from "../../model/formElements/ISelectAnswer";
import { Utils } from "../Utils";
import { QuestionBase } from "./QuestionBase";

export class QuestionSelect extends QuestionBase {
    private selects: ISelectAnswer[];

    constructor(data: IQuestionData) {
        super(data);
        this.type = 'Select';
        this.title = data.title || '';
        this.required = data.required || false;
        this.answer = '';
        this.selects = this.createSelect(data.selects)
    }

    private createSelect(data: ISelectAnswer[]) {
        const select: ISelectAnswer[] = [];
        if (data?.length) {
            for (const element of data) {
                const selectObj: ISelectAnswer = {
                    id: element.id || Utils.generateGUID(),
                    title: element.title || 'Ответ',
                    checked: element.checked || false,
                    selected: element.selected || false,
                }
                select.push(selectObj);
            }
        }
        return select;
    }

    public override getValue() {
        let selects: ISelectAnswer[] = [];
        if (this.selects?.length) {
            selects = [...this.selects]
        }
        return selects;
    }

    public override setFieldByName(fieldName: string, newValue: any, index: number) {
        if (index >= 0 && index < this.selects.length) {
            const choice = this.selects[index];
            if (fieldName in choice) {
                choice[fieldName] = newValue;
            }
        }
    }

    public setValue(newValue: any) {
        this.answer = newValue;
    }

    public override addChoice(): void {
        const selectObj: ISelectAnswer = {
            id: Utils.generateGUID(),
            title: 'Ответ',
            checked: false,
            selected: false,
        };
        this.selects.push(selectObj);
    }

    public override deleteChoice(itemId: number): void {
        this.selects.splice(itemId, 1);
    }
}