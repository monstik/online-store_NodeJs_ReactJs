import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false;
        this._user = {};
        this._users = [];
        this._totalCount = 0;
        this._page = 1;
        this._limit = 10;
        makeAutoObservable(this);
    };

    setIsAuth(bool) {
        this._isAuth = bool;
    };

    setUser(user) {
        this._user = user;
    };

    setUsers(users) {
        this._users = users;
    }

    setPage(page) {
        this._page = page;
    }

    setLimit(limit) {
        this._limit = limit;
    }

    setTotalCount(count) {
        this._totalCount = count;
    }

    get isAuth() {
        return this._isAuth;
    };

    get user() {
        return this._user;
    };

    get users() {
        return this._users;
    }

    get page() {
        return this._page;
    }

    get limit() {
        return this._limit;
    }

    get totalCount () {
        return this._totalCount;
    }
}