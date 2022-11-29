const express = require('express');

const server = express();

server.use(express.json());

//CRUD 

const clientes = ['Artur', 'Maria', 'Renata', 'Beatriz', 'Jorge']; // Vetor de clientes para servir de exemplo na testagem da API no Postman ou Insomnia


// Criando um middleware para checar se está sendo enviado pelo frontend o nome do cliente. Deverá ser acrescentado no post e no put, onde há esta requisição.

function checarCliente(req, res, next) {
  if (!req.body.name){
    return res.status(400).json({ error: "Nome do cliente é obrigatório" });
  }

  return next();
}


// Buscando clientes pelo nome
server.get('/infosupri/cliente', (req, res)=> {
  return res.json(clientes);
});

// Buscando clientes pela posição no vetor (índice)
server.get('/infosupri/cliente/:index', (req, res) => {
  const { index } = req.params;

  return res.json(clientes[index]);

});


//Criando um novo cliente
server.post('/infosupri/cliente', checarCliente, (req, res)=> {
  const { name } = req.body;
  clientes.push(name);

  return res.json(clientes);
});

//Atualizando um cliente
server.put('/infosupri/cliente/:index', checarCliente, (req, res)=>{
  const { index } = req.params;
  const { name } = req.body;

  clientes[index] = name;

  return res.json(clientes);

});


//Excluindo algum cliente
server.delete('/infosupri/cliente/:index', (req, res)=>{
  const { index } = req.params;

  clientes.splice(index, 1);
  return res.send();
})

server.listen(3000);