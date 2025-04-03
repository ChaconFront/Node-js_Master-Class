const z=require('zod');


  const movieSchema=z.object({
    title: z.string({
      invalid_type_error: 'El titulo es obligatorio',
    }).min(1),
    year: z.number().int().positive().min(1900).max(2024),
    genre: z.enum(),
    duration: z.number().int().positive(),
    rate: z.number().optional(),
    poster: z.string().url({
      message:'url invalida',
    }),
    direction: z.string().min(1),
  })


  
  function validateMovie(object) {
    return movieSchema.safeParse(object);
  }

  function validatePartialMovie(object){
    return movieSchema.partial().safeParse(object);//hace que todos los campos sean opcionales
  }

  module.exports={validateMovie,validatePartialMovie};