import { ISurveyModel } from "../../../../SurveyCore/src/model/ISurveyModel";
import { QuestionType } from "../../../../SurveyCore/src/model/QuestionType";
import { ICurrentItem } from "../../model/ICurrentItem";

export interface ICommandBarPropertiesProps {
    item: string;
    survey: ISurveyModel;
    pageId?: number;
    itemQuestion?: QuestionType;
    questionId?: number
    editCurrentItem: (item?: string, pageId?: number, questionId?: number) => void;
    editCurrentPropertyItem: (
        title?: string,
        description?: string,
        required?: boolean,
        typeQuestion?: QuestionType,
        questionId?: number,
        pageId?: number) => void;
    deletePage?: (pageId?: number) => void;
    deleteQuestion: (questionId?: number, pageId?: number) => void;
    addPage?: (pageId?: number) => void;
    currentItem?: ICurrentItem;
}