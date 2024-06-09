import { IPanelData } from "./IPanelData";

export interface IPageData {
    order: string;
    id: string;
    description: string;
    panels: IPanelData[];
    title: string;
}