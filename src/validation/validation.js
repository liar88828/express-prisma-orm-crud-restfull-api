import { ResponseError } from "../error/responseError.js";

export const validate = (schema, request) => {
  const result = schema.validate(
    request, {
      abortEarly: false,
      allowUnknown: false
    })
  // console.log(result)
  if (result.error) {
    throw new ResponseError(400, result.error.message)
  } else {
    return result.value
  }
}
