const validation = (schema) => async (req, res, next) => {
    const body = req.body.data;

    try {
        await schema.validate(body);
        return next();
    } catch (err) {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        return next(err);
    }
}

module.exports = validation;