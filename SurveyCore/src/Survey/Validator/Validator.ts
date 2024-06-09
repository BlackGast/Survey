export class Validator {

    public static validDate(data: string): boolean {
        const dataValid = /^\d{1,2}\.\d{1,2}\.\d{4}$/;
        return dataValid.test(data)
    }

    public static validNum(num: string): boolean {
        const dataValid = /^\d{1,2}$/;
        return dataValid.test(num);
    }

    public static validText(text: string): boolean {
        const dataValid = /^(?=[a-z0-9])[a-z0-9\s]{0,99}[a-z0-9]$/i;
        return dataValid.test(text);
    }
}