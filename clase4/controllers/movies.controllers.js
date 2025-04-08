import { MovieModel } from "../models/movie";

export class MovieController {
  
    static async getAll(req, res) {
    try {
      const { genre } = req.query;
      const movies = await MovieModel.getAll({ genre });

      //esto esw lom que se renderiza en el cliente
      res.json(movies);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }




}
