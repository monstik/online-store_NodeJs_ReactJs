import {makeAutoObservable} from "mobx";

export default class AdminStore {
    constructor() {
        this._brandsVisible = false;
        this._typesVisible = false;
        this._devicesVisible = false;



        this._onUpdate = false;
        makeAutoObservable(this);
    };



    setBrandsVisible(bool) {
        this._brandsVisible = bool;
    }

    setTypesVisible(bool) {
        this._typesVisible = bool;
    }

    setDevicesVisible(bool) {
        this._devicesVisible = bool;
    }



    setOnUpdate(bool) {
        this._onUpdate = bool;
    }

    get brandsVisible() {
        return this._brandsVisible;
    }

    get typesVisible() {
        return this._typesVisible;
    }

    get devicesVisible() {
        return this._devicesVisible;
    }



    get onUpdate () {
        return this._onUpdate;
    }





};

