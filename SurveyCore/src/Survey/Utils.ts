import { v4 as uuidv4 } from 'uuid';

export class Utils {
    public static generateGUID() {
        return uuidv4()
    }
}
