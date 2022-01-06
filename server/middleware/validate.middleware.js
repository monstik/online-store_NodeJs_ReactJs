const {validationResult} = require("express-validator");
const ApiError = require("../error/ApiError");

const validate = validations => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);

        if (errors.isEmpty()) {
            return next();
        }

       return next(new ApiError(400, errors.array()[0].msg))

    };
};

module.exports = validate;