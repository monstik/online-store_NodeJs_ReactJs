import {makeAutoObservable} from "mobx";

export default class BasketStore {
    constructor() {
        this._basket = [];
        this._basketCount = 0;
        this._totalPrice = 0;
        this._isBasketUpdated = true;
        makeAutoObservable(this);
    };

    setIsBasketUpdated(bool){
        this._isBasketUpdated = bool;
    }

    setBasketCount(count) {
        this._basketCount = count;
    }

    setBasket(basket) {
        this._basket = basket;
        this._isBasketUpdated = false;
    }

    setTotalPrice(price) {
        this._totalPrice = price;
    }

    get isBasketUpdated() {
        return this._isBasketUpdated;
    }

    get basketCount() {
        return this._basketCount;
    }

    get basket() {
        return this._basket;
    }

    get totalPrice() {
        return this._totalPrice;
    }

}