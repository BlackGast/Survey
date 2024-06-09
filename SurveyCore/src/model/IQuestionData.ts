import { QuestionType } from "./QuestionType";
import { IChoice } from "./formElements/IChoice";
import { ISelectAnswer } from "./formElements/ISelectAnswer";

export interface IQuestionData {
    order: string;
    id: string;
    title: string;
    type: QuestionType;
    answer?: string;
    required?: boolean;
    choices?: IChoice[];
    selects?: ISelectAnswer[];
}