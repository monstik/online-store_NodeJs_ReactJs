const {check} = require("express-validator");
const {User} = require("../models/models");
const bcrypt = require("bcrypt");

exports.registrationsValidators = [
    check('email')
        .isEmail()
        .withMessage('Uncorrect email')
        .custom(async (email) => {
            try {
                const user = await User.findOne({where: {email}});

                if (user) {
                    return Promise.reject(`Пользователь с email: ${email} уже существует`);
                }
            } catch (e) {
                console.log(e);
            }
        }),

    check('password')
        .isLength({min: 3, max: 20})
        .withMessage('Password must be longer than 3 and shorter than 20')
        .isAlphanumeric()
        .withMessage('В пароле можно использовать только латиницу'),

    check('repeatPassword').custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('Пароли должны совпадать');
        }
        return true;
    }),
    // check('name')
    //     .isLength({min: 3})
    //     .withMessage('Имя должно быть минимум 3 символа'),
]

exports.loginValidators = [
    check('email')
        .isEmail()
        .withMessage('Uncorrect email')
        .custom(async (email) => {
            try {

                const user = await User.findOne({where: {email}});

                if (!user) {
                    return Promise.reject(`Пользователь с email: ${email} не найден`);
                }
            } catch (e) {
                console.log(e);
            }
        }),

    check('password')
        .custom(async (password, {req}) => {
        try {

            const user = await User.findOne({where: {email: req.body.email}});
            const comparePassword = await bcrypt.compare(password, user.password);

            if(!comparePassword){
                return Promise.reject('Не правельный пароль');
            }

        } catch (e) {
            console.log(e);
        }
    }),
]

exports.typesValidator = [
    check('name').isLength({min: 1}).withMessage('Поле не может быть пустым')
]

exports.brandValidator = [
    check('name').isLength({min: 1}).withMessage('Поле не может быть пустым')
]