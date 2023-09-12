const express = require('express');
let apiRouter = express.Router();
const endpoint = '/';

const knex = require('knex') (require('../../knexfile').development)


// Rota para obter todos os carros
apiRouter.get(endpoint + 'carros', (req, res) => {
  knex("carros").then(carros => {
    res.status(200).json(carros)
  })
});

// Rota para obter um carro por ID
apiRouter.get(endpoint + 'carros/:id', (req, res) => {
    const carroId = parseInt(req.params.id);
    knex("carros")
      .where({ id: carroId })
      .first()
      .then(carro => {
        if (!carro) {
          res.status(404).json({ mensagem: 'Carro não encontrado' });
        } else {
          res.status(200).json(carro);
        }
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
      });
  });
  
  // Rota para criar um novo carro
  apiRouter.post(endpoint + 'carros', (req, res) => {
    const novoCarro = req.body;
    if (!novoCarro.descricao || !novoCarro.valor || !novoCarro.marca) {
      res.status(400).json({ mensagem: 'Descrição, valor e marca são obrigatórios' });
    } else {
      knex("carros")
        .insert(novoCarro)
        .returning('*')
        .then(carro => {
          res.status(201).json(carro[0]);
        })
        .catch(error => {
          console.error(error);
          res.status(500).json({ mensagem: 'Erro interno do servidor' });
        });
    }
  });
  
  // Rota para atualizar um carro por ID
  apiRouter.put(endpoint + 'carros/:id', (req, res) => {
    const carroId = parseInt(req.params.id);
    const dadosAtualizados = req.body;
    knex("carros")
      .where({ id: carroId })
      .update(dadosAtualizados)
      .returning('*')
      .then(carro => {
        if (carro.length === 0) {
          res.status(404).json({ mensagem: 'Carro não encontrado' });
        } else {
          res.status(200).json(carro[0]);
        }
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
      });
  });
  
  // Rota para excluir um carro por ID
  apiRouter.delete(endpoint + 'carros/:id', (req, res) => {
    const carroId = parseInt(req.params.id);
    knex("carros")
      .where({ id: carroId })
      .del()
      .then(rowsDeleted => {
        if (rowsDeleted === 0) {
          res.status(404).json({ mensagem: 'Carro não encontrado' });
        } else {
          res.status(204).send();
        }
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
      });
  });
  
  module.exports = apiRouter;
