import { IBaseElement } from "./IBaseElement";

export interface IChoice extends IBaseElement {
    checked: boolean;
    disabled: boolean;
}