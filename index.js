const express = require("express");
const knex = require("./conexao");

const app = express();

app.use(express.json());

//Usando where
app.get("/where", async (req, res) => {
  // conexao.query('select * from agenda')
  // const agenda = await knex("agenda").debug();
  // const agenda = await knex.raw('select * from agenda');//Query bruta
  // conexao.query('select * from agenda where id = $1' , [5] )
  //const agenda = await knex("agenda").where('id', 5).debug();
  //const agenda = await knex('agenda').whereNotIn('id', [5, 8, 1]);
  const agenda = await knex('agenda').where({ id: 5}).debug();
  return res.json(agenda);
});
//Usando First e Select
app.get("/FirstESelect", async (req, res) => {
  try {
    // const agenda = await knex('agenda').where({ id: 5}).first().debug();
    const agenda = await knex('agenda').where({ id: 5 }).select('email', 'telefone').first().debug();
    return res.json(agenda);
  } catch (error) {
    console.error("Erro ao obter número de registros na tabela:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
