import {makeAutoObservable} from "mobx";

export default class TypeStore {
    constructor() {
        this._types = [];
        this._selectedType = {};
        makeAutoObservable(this);
    };

    setTypes(types) {
        this._types = types;
    };

    setSelectedType(type) {
        this._selectedType = type;
    }

    get types() {
        return this._types;
    };

    get selectedType() {
        return this._selectedType;
    }
}