import { Page } from "../Survey/Page/Page";

export interface ISurveyModel {
    title: string;
    description: string;
    pages: Page[];
}