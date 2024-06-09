import { IQuestionData } from "./IQuestionData";

export interface IPanelData{
    order: string;
    id: string;
    title: string;
    description: string;
    questions: IQuestionData[];
}