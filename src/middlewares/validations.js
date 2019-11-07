import joi from 'joi';

const validateSchema = (data, schema) => {
  const validationErrors = joi.validate(data, schema);
  if (validationErrors.error) {
    const { details } = validationErrors.error;
    const message = details.map((i) => i.message).join(',');
    return message;
  }
  return false;
};

export const validateIdParam = (req, res, next) => {
  const schema = joi.object().keys({
    id: joi.number().integer()
  });
  const validationError = validateSchema(req.params, schema);
  if (validationError) {
    return res.status(400)
      .send({ error: validationError });
  }
  return next();
};

export const validateGetAllDrivers = (req, res, next) => {
  if (req.query.status) {
    const schema = joi.object().keys({
      status: joi.string().trim().valid(['available', 'on duty']),
    });
    const validationError = validateSchema(req.query, schema);
    if (validationError) {
      return res.status(400)
        .send({ error: validationError });
    }
    return next();
  }
  return next();
};

export const validateTripBody = (req, res, next) => {
  const schema = joi.object().keys({
    riderId: joi.number().integer().required(),
    driverId: joi.number().integer().required(),
    pickup: joi.string().required(),
    destination: joi.string().required()
  });
  const validationError = validateSchema(req.body, schema);
  if (validationError) {
    return res.status(400)
      .send({ error: validationError });
  }
  return next();
};

export const validateCompleteTripBody = (req, res, next) => {
  const schema = joi.object().keys({
    cost: joi.number().required()
  });
  const validationError = validateSchema(req.body, schema);
  if (validationError) {
    return res.status(400)
      .send({ error: validationError });
  }
  return next();
};

export const validateLocation = (req, res, next) => {
  const schema = joi.object().keys({
    latitude: joi.number().min(-90).max(90).required(),
    longitude: joi.number().min(-180).max(180).required()
  });
  const validationError = validateSchema(req.query, schema);
  if (validationError) {
    return res.status(400)
      .send({ error: validationError });
  }
  return next();
};
