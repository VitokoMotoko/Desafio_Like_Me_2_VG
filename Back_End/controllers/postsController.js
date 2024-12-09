const pool = require('../db/db');

//Esto corresponde al punto 3 del desafio 2 y lo tenia listo del desafio 1...
//Aunqeu el material de apoyo sirve entiendo que con lo que ya habia desarrollado no deberia tener problemas.... integré la carpeta src pero no la utilicé
const getPosts = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM posts');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener los posts' });
  }
};

const createPost = async (req, res) => {
    const { titulo, url, descripcion } = req.body; // Cambia 'img' por 'url'
    try {
      if (!url) {
        return res.status(400).json({ error: 'El campo url es obligatorio' });
      }
      const result = await pool.query(
        'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, 0) RETURNING *',
        [titulo, url, descripcion] // Usa 'url' aquí y mapea a 'img'
      );
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error al crear el post:', err);
      res.status(500).json({ error: 'Error al crear el post', details: err.message });
    }
  };

  //Esto tambien es para el punto 1 el cual lo tenia listo de la semana pasada
const likePost = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *',
      [id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al dar like al post' });
  }
};

 //esto tambien lo tenia listo y corresponde al punto 2 del desafio 2
const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM posts WHERE id = $1', [id]);
    res.json({ message: 'Post eliminado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar el post' });
  }
};

module.exports = {
  getPosts,
  createPost,
  likePost,
  deletePost,
};