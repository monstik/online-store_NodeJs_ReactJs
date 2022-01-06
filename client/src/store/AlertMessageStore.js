import {makeAutoObservable} from "mobx";

export default class AlertMessageStore {
    constructor() {
        this._message = '';
        this._isError = false;
        this._isVisible = false;
        makeAutoObservable(this);
    }

    setSuccessMessage(message){
        this._isVisible = true;
        this._isError = false;
        this._message = message;
    }

    setErrorMessage(message){
        this._isVisible = true;
        this._isError = true
        this._message = message;
    }

    setIsVisible(bool){
        this._isVisible = bool;
    }

    setMessage(message) {
        this._message = message;
    }
    get message() {
        return this._message;
    }

    get isVisible() {
        return this._isVisible;
    }

    get isError() {
        return this._isError;
    }
}