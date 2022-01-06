const jwt = require("jsonwebtoken");
const ApiError = require("../error/ApiError");

module.exports = function (role) {
    return function (req, res, next) {
        if(req.method === 'OPTIONS'){
            next();
        }

        try {

            const token = req.headers.authorization.split(' ')[1];

            if(!token){
                return next(new ApiError(401, "Не авторизован"));
            }

            const decoded = jwt.verify(token, process.env.SECRET_KEY);

            if(decoded.role !== role){
                return next(new ApiError(403, "Нету доступа"));
            }

            req.user = decoded;
            next();

        } catch (e) {
            return next(new ApiError(401, "Не авторизован"));
        }
    }
}