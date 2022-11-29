const express = require('express');

const server = express();

server.use(express.json());

//CRUD 

const clientes = ['Artur', 'Maria', 'Renata', 'Beatriz', 'Jorge']; // Vetor de clientes para servir de exemplo na testagem da API no Postman ou Insomnia


// Buscando clientes pelo nome
server.get('/cliente', (req, res)=> {
  return res.json(clientes);
});

// Buscando clientes pela posição no vetor (índice)
server.get('/cliente/:index', (req, res) => {
  const { index } = req.params;

  return res.json(clientes[index]);

});


//Criando um novo cliente
server.post('/cliente', (req, res)=> {
  const { name } = req.body;
  clientes.push(name);

  return res.json(clientes);
});

//Atualizando um cliente
server.put('/cliente/:index', (req, res)=>{
  const { index } = req.params;
  const { name } = req.body;

  clientes[index] = name;

  return res.json(clientes);

});


//Excluindo algum cliente
server.delete('/cliente/:index', (req, res)=>{
  const { index } = req.params;

  clientes.splice(index, 1);
  return res.send();
})

server.listen(3000);