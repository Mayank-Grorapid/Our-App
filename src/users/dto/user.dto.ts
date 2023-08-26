import * as Joi from 'joi';

export class User {
  id?: number;
  email?: string;
  password?: string;

  // validate(): Joi.ValidationResult {
  //   const schema = Joi.object({
  //     email: Joi.string().email().required(),
  //     password: Joi.string().alphanum().min(6).max(32).required(),
  //   });
    
  //   return schema.validate(this);
  // }
}
