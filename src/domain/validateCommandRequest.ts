import * as Joi from 'joi'
import { ValidationError } from 'joi'
import { ERROR_INVALID_PARAMS } from './constants'

export const getSchemaCommandRequest = () => {
  return Joi.object({
    nameCommand: Joi.string().required(),
  })
}

export const prepareErrorParamsRequest = (error: ValidationError) => {
  return {
    error: {
      code: ERROR_INVALID_PARAMS,
      message: error.details[0].message,
    },
  }
}
