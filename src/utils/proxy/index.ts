import {LPointer} from "@/data/Pointer";
import {Value} from "@/utils/type";

export class ProxyWrapper {
    public static handler<T extends LPointer>() {
        return {
            get(obj: T, prop: keyof T) {
                const strProp = String(prop);
                const functionName: string = 'get' + strProp.charAt(0).toUpperCase() + strProp.slice(1);
                if(functionName in obj) {
                    const index = functionName as keyof LPointer;
                    if(typeof obj[index] === 'function') {
                        return (obj[index] as () => {})();
                    }
                }
                return undefined;
            },
            set(obj: T, prop: keyof T, value: Value) {
                const strProp = String(prop);
                const functionName: string = 'set' + strProp.charAt(0).toUpperCase() + strProp.slice(1);
                if(functionName in obj) {
                    const index = functionName as keyof LPointer;
                    if(typeof obj[index] === 'function') {
                        (obj[index] as (param: Value) => {})(value);
                        return true;
                    }
                }
                return false;
            }
        }
    }
}
