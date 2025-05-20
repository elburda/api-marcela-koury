import Joi from "joi";

export const articulosValidation = (data) =>{
    const Schema = Joi.object({
        title: Joi.string().min(3).max(50).required().messages({
            'string.empty': "el titulo es obligatorio",
            'any.required': "el titulo es Requerido",
            'string.min': "el titulo debe tener un minimo de 3 ch",
        }),
        tags: Joi.array().items(Joi.string()),
        description: Joi.string().min(10).required(),
        price: Joi.number().required(true),
        size: Joi.string().min(1).max(3),
        color: Joi.string().max(20),
        stock: Joi.number()
    })
    return Schema.validate(data)
}