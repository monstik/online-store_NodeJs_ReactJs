import {makeAutoObservable} from "mobx";

export default class DeviceStore {
    constructor() {
        this._devices = [];
        this._selectedDevice = undefined;
        this._totalCount = 0;
        this._page = 1;
        this._search = '';
        this._isSearch = false;
        this._limit = 10;
        this._isLoading = true;

        makeAutoObservable(this);
    };

    setIsLoading(bool) {
        this._isLoading = bool;
    }

    setSearch(value) {
        this._search = value;
        this._page = 1;
    }

    setIsSearch(bool){
        this._isSearch = bool;
    }

    setDevices(devices) {
        this._devices = devices;
    };

    setSelectedDevice(device) {
        this._selectedDevice = device;
    }

    setTotalCount(count) {
        this._totalCount = count;
    };

    setPage(page) {
        this._page = page;
    };

    setLimit(limit) {
        this._limit = limit;
    };

    get isLoading() {
        return this._isLoading;
    }

    get search() {
        return this._search;
    }

    get isSearch() {
        return this._isSearch;
    }

    get devices() {
        return this._devices;
    }

    get totalCount() {
        return this._totalCount;
    };

    get page() {
        return this._page;
    };

    get limit() {
        return this._limit;
    };

    get selectedDevice () {
        return this._selectedDevice;
    };



}