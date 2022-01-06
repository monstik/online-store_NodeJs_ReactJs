const {Basket, BasketDevice, Device} = require('../models/models')
const ApiError = require("../error/ApiError");


class BasketController {
    async fetchBasket(req, res, next) {
        try {
            const basket = await Basket.findOne({where: {userId: req.user.id}});
            if (basket) {
                const basketItems = await BasketDevice.findAll(
                    {
                        where: {basketId: basket.id},
                        include: [{
                            model: Device
                        }], order: ['id']
                    });

                return res.json({
                    basket: basketItems,
                    basketCount: basket.count,
                    totalPrice: basket.totalPrice
                })
            }
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    };

    async addToBasket(req, res, next) {
        try {
            const {deviceId} = req.body;
            const device = await Device.findOne({where: {id: deviceId}});
            const basket = await Basket.findOne({where: {userId: req.user.id}});
            const candidate = await BasketDevice.findOne({
                where: {basketId: basket.id, deviceId: device.id},
                include: [{
                    model: Device
                }], order: ['id']
            });

            if (candidate) {
                candidate.count++;
                basket.totalPrice += candidate.device.price
                await candidate.save();


            } else {

               await BasketDevice.create({basketId: basket.id, deviceId: device.id});

                basket.totalPrice = basket.totalPrice + device.price;


            }

            basket.count++;

            await basket.save();

            return res.status(200).json({message: "Товар успешно добавлен"})

        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    };

    async removeFromBasket(req, res, next) {
        try {
            const {deviceId, isRemoveAll} = req.query;

            const basket = await Basket.findOne({where: {userId: req.user.id}});
            const device = await Device.findOne({where: {id: deviceId}});

            const basketItem = await BasketDevice.findOne({where: {basketId: basket.id, deviceId: device.id}});

            if (isRemoveAll) {
                basket.count -= basketItem.count;
                basket.totalPrice -= basketItem.count * device.price
                await basketItem.destroy();
                await basketItem.save();
                await basket.save();
                return res.status(200).json({message: "Товар успешно удален"});
            }

            if (basketItem) {
                if (basketItem.count > 1) {
                    basketItem.count--;

                    await basketItem.save();


                } else {
                    await basketItem.destroy();
                    await basketItem.save();
                }
            }
            basket.count--;
            basket.totalPrice -= device.price;
            await basket.save();
            return res.status(200).json({message: "Товар успешно удален"});

        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    };


}

module.exports = new BasketController();