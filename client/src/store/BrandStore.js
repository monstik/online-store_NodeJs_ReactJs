import {makeAutoObservable} from "mobx";

export default class BrandStore {
    constructor() {
        this._brands = [];
        this._selectedBrand = {};
        makeAutoObservable(this);
    };


    setBrands(brands) {
        this._brands = brands;
    };

    get brands() {
        return this._brands;
    };

    setSelectedBrand(brand) {
        this._selectedBrand = brand;
    };

    get selectedBrand() {
        return this._selectedBrand;
    };
}