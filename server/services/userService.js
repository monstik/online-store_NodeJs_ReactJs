const {User, Basket} = require("../models/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserService {
    async create(newUser) {
        try {

            const hashPassword = await bcrypt.hash(newUser.password, 5);
            const user = await User.create(
                {
                    email: newUser.email,
                    firstName: newUser.firstName,
                    middleName: newUser.middleName,
                    lastName: newUser.lastName,
                    phoneNumber: newUser.phoneNumber,
                    birthday: new Date(newUser.birthday),
                    password: hashPassword,
                    address: newUser.address,
                    gender: newUser.gender
                });
            const basket = await Basket.create({userId: user.id});
            return user;
        } catch (e) {
            throw e;
        }
    }

    generateJWT({id, email, firstName, role}) {
        return jwt.sign({
                id,
                email,
                firstName,
                role
            },
            process.env.SECRET_KEY,
            {expiresIn: "24h"}
        );
    }

    async updateUser({id, email, password, name, role}) {
        try {
            await User.update({email, password, name, role}, {

                plain: true,
                where: {id}
            });

        } catch (e) {
            throw e;
        }
    }
}

module.exports = new UserService;