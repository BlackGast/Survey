import { IQuestionPreviewBaseProps } from "../IQuestionPreviewBaseProps";

export interface ICheckboxQuestionPreviewProps extends IQuestionPreviewBaseProps {
    addChoices: (
        answer?: string,
        id?: string,
    ) => void;
}