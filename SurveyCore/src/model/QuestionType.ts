/*
Text - текстовое поле, <input type="text"/> или <textarea></textarea>.
Choice - один или группа checkbox
Select - аналог <select></select>
Date - пикер даты с календарем
Number - аналог <input type="number" />
*/
export type QuestionType = 'Text' | 'Number' | 'Choice' | 'Select' | 'Date';