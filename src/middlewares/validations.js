import joi from 'joi';

export const validateIdParam = (req, res, next) => {
  const validationErrors = joi.validate(req.params.id, joi.number().integer());
  if (validationErrors.error) {
    return res.status(400)
      .send({ errors: validationErrors });
  }
  return next();
};

export const validateGetAllDrivers = (req, res, next) => {
  if (req.query.status) {
    const validationErrors = joi.validate(req.query, joi.object().keys({
      status: joi.string().trim().valid(['available', 'on duty']),
    }));
    if (validationErrors.error) {
      return res.status(400)
        .send({ errors: validationErrors });
    }
    return next();
  }
  return next();
};

export const validateTripBody = (req, res, next) => {
  const validationErrors = joi.validate(req.body, joi.object().keys({
    riderId: joi.number().integer().required(),
    driverId: joi.number().integer().required(),
    pickup: joi.string().required(),
    destination: joi.string().required()
  }));
  if (validationErrors.error) {
    return res.status(400)
      .send({ errors: validationErrors });
  }
  return next();
};

export const validateCompleteTripBody = (req, res, next) => {
  const validationErrors = joi.validate(req.body, joi.object().keys({
    cost: joi.number().required()
  }));
  if (validationErrors.error) {
    return res.status(400)
      .send({ errors: validationErrors });
  }
  return next();
};

export const validateLocation = (req, res, next) => {
  const validationErrors = joi.validate(req.query, joi.object().keys({
    latitude: joi.number().min(-90).max(90).required(),
    longitude: joi.number().min(-180).max(180).required()
  }));
  if (validationErrors.error) {
    return res.status(400)
      .send({ errors: validationErrors });
  }
  return next();
};
