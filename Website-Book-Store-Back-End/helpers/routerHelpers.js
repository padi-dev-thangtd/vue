const Joi = require('@hapi/joi');

const validateBody = (schema) => {
	return (req, res, next) => {
		const validatorResult = schema.validate(req.body);
		if (validatorResult.error) {
			return res.status(400).json(validatorResult.error);
		} else {
			if (!req.value) req.value = {};
			if (!req.value['params']) req.value.params = {};
			req.value.body = validatorResult.value;

			next();
		}
	}
}

const validateParam = (schema, name) => {
	return (req, res, next) => {
		const validatorResult = schema.validate({ param: req.params[name] });
		if (validatorResult.error) {
			return res.status(400).json(validatorResult.error);
		} else {
			if (!req.value) req.value = {};
			if (!req.value['params']) req.value.params = {};
			req.value.params[name] = req.params[name];

			next();
		}
	}
}

const schemas = {
	idSchema: Joi.object().keys({
		param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
	}),

	userSchema: Joi.object().keys({
		userName: Joi.string().email().required(),
		password: Joi.string().required(),
		permission: Joi.string().required(),
		name: Joi.string().min(2).required(),
		phone: Joi.string().length(10).required(),
		address: Joi.string().required(),
		email: Joi.string().email().required(),
	}),
}

module.exports = {
	validateParam,
	schemas,
	validateBody,
}
