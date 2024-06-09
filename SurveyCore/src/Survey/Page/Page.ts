import { IPageData } from "../../model/IPageData";
import { IPanelData } from "../../model/IPanelData";
import { Panel } from "../Panel/Panel";
import { Utils } from "../Utils";

/**
 * Используется для группировки вопросов в UI
 */
export class Page {
    public order: string;
    public id: string;
    public title: string;
    public description: string;
    public panels: Panel[];

    constructor(data: IPageData) {
        this.order = data.order || '';
        this.id = data.id || Utils.generateGUID();
        this.title = data.title;
        this.description = data.description;
        this.panels = [];
    }

    public addPanel = (data: IPanelData) => {
        const newPanel = new Panel(data);
        this.panels.push(newPanel);
    }

    public getPanels(): Panel[] {
        return this.panels;
    }

    public getPanelById(id: string): Panel | undefined {
        return this.panels.find(panel => panel.id === id);
    }
}