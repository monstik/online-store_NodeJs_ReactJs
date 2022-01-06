const ApiError = require("../error/ApiError");
const UserService = require("../services/userService");
const {User} = require("../models/models");


class UserController {
    async registration(req, res, next) {
        try {
            const {
                email,
                firstName,
                middleName,
                lastName,
                phoneNumber,
                birthday,
                password,
                address,
                gender
            } = req.body
            const newUser = {
                email,
                firstName,
                middleName,
                lastName,
                phoneNumber,
                birthday,
                password,
                address,
                gender
            }
            const user = await UserService.create(newUser);
            const token = UserService.generateJWT(user);
            return res.json({token});
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    };

    async login(req, res, next) {
        try {
            const user = await User.findOne({where: {email: req.body.email}});
            const token = UserService.generateJWT(user)
            return res.json({token});
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    };

    async check(req, res, next) {
        try {
            const token = UserService.generateJWT(req.user);
            return res.json({token});
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    };
//нужно будет убрать пароль с отправки TODO
    async fetchUser(req, res, next) {
        try {
            const user = await User.findOne({where: {id: req.user.id}});
            return res.json(user);

        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next) {
        try {
            let {limit, page} = req.query;

            page = page || 1;
            limit = limit || 10;

            let offset = page * limit - limit;

            const users = await User.findAndCountAll({
                attributes: ['id', 'email', 'name', 'role'],
                order: ['id'],
                limit,
                offset
            });

            return res.json(users);

        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    };

    async updateUserRole(req, res, next) {
        try {

            const {id, role} = req.body;
            const user = await User.findOne({where: {id: id}});

            await UserService.updateUser({
                id: user.id,
                name: user.name,
                email: user.email,
                role
            })
            return res.status(200).json({message: 'Роль пользователя успешно обновлена'});
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new UserController();