export interface DPointer {
    id: string;
    classname: string;
}

export class LPointer implements DPointer {
    classname = LPointer.name;
    id: string;

    constructor(id?: string) {
        this.id = (id) ? id : 'POINTER_' + Date.now();
    }

    raw(): DPointer { return {...this}; }
}

