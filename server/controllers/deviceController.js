const deviceService = require("../services/deviceService");
const ApiError = require("../error/ApiError");
const {Device, DeviceInfo} = require("../models/models");
const {Sequelize, Op} = require("sequelize");


class DeviceController {
    async create(req, res, next) {
        try {
            const {name, price, brandId, typeId, info} = req.body;
            const {img} = req.files;

            const device = await deviceService.create(name, price, brandId, typeId, info, img);
            return res.json(device);
        } catch (e) {

            next(ApiError.badRequest(e.message));
        }
    };

    async getAll(req, res, next) {
        try {
            let {brandId, typeId, limit, page} = req.query;

            page = page || 1;
            limit = limit || 10;

            let offset = page * limit - limit;
            let devices;
            if (!brandId && !typeId) {
                //затычка order[id] для админки, в будущем нужно пофиксить
                devices = await Device.findAndCountAll({limit, offset, order: ['id']});
            }
            if (brandId && !typeId) {
                devices = await Device.findAndCountAll({where: {brandId}, limit, offset});
            }
            if (!brandId && typeId) {
                devices = await Device.findAndCountAll({where: {typeId}, limit, offset});
            }
            if (brandId && typeId) {
                devices = await Device.findAndCountAll({where: {brandId, typeId}, limit, offset});
            }

            return res.json(devices);

        } catch (e) {

            next(ApiError.badRequest(e.message));
        }
    };

    async getOne(req, res, next) {
        try {
            const {id} = req.params;
            const device = await Device.findOne({
                where: {id},
                include: [{
                    model: DeviceInfo,
                    as: 'info'
                }]
            })

            return res.json(device);

        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    };

    async updateDevice(req, res, next) {
        try {
            const {id, name, price, typeId, brandId, info} = req.body;
            let img = undefined;
            if (req.files) {
                img = req.files.img
            }

            await deviceService.updateDevice(id, name, price, brandId, typeId, info, img);
            return res.json({message: 'Товар успешно изменен'});
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    };

    async searchDevice(req, res, next) {
        try {

            let {searchName,typeId, brandId, limit, page} = req.query;
            page = page || 1;
            limit = limit || 10;
            let offset = page * limit - limit;
            let devices;
            if (!brandId && !typeId) {
                //затычка order[id] для админки, в будущем нужно пофиксить
                devices = await Device.findAndCountAll({where: {name: {[Op.iLike]: `%${searchName}%`}}, limit, offset, order: ['id']});
            }
            if (brandId && !typeId) {
                devices = await Device.findAndCountAll({where: {name: {[Op.iLike]: `%${searchName}%`}, brandId}, limit, offset});
            }
            if (!brandId && typeId) {
                devices = await Device.findAndCountAll({where: {name: {[Op.iLike]: `%${searchName}%`}, typeId}, limit, offset});
            }
            if (brandId && typeId) {
                devices = await Device.findAndCountAll({where: {name: {[Op.iLike]: `%${searchName}%`}, brandId, typeId}, limit, offset});
            }

            return res.json(devices);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new DeviceController();