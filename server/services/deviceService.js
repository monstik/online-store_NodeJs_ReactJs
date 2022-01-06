const uuid = require("uuid");
const path = require("path");
const {Device, DeviceInfo} = require("../models/models");

class DeviceService {
    async create(name, price, brandId, typeId, info, img) {
        try {

            let fileType = img.name.split('.');
            let fileName = uuid.v4() + '.' + fileType[fileType.length - 1];
            await img.mv(path.resolve(__dirname, '..', 'static', fileName));
            const device = await Device.create({name, price, brandId, typeId, img: fileName});

            if (info) {
                info = JSON.parse(info);
                info.forEach(
                    i => DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                );
            }


            return device;
        } catch (e) {
            throw e;
        }
    }

    async updateDevice(id, name, price, brandId, typeId, info, img) {
        try {

            const device = await Device.findOne({where: {id}});
            let newImg;
            if (img) {
                let fileType = img.name.split('.');
                newImg = uuid.v4() + '.' + fileType[fileType.length - 1];
                await img.mv(path.resolve(__dirname, '..', 'static', newImg));

            }

            await Device.update({
                name,
                price,
                img: newImg || device.img,
                typeId,
                brandId,

            }, {where: {id: device.id}})

            let test = await DeviceInfo.findAll({where: {deviceId: device.id}});

            if(!info && test){
                await DeviceInfo.destroy({where: {deviceId: device.id}});
                return
            }

            if(info && test){
                await DeviceInfo.destroy({where: {deviceId: device.id}});
                info = JSON.parse(info);
                info.forEach(
                    i => DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                );
            }
            console.log('info', info)
            console.log('deviceInfo', test)
            //      await Device.findAll({where: id})

        } catch (e) {
            throw e;
        }
    }
}


module.exports = new DeviceService();