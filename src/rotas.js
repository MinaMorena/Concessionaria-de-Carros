const express = require("express")
const { listarCarros, detalharCarro, cadastrarCarro, atualizarCarro, excluirCarro } = require("./controladores/carros")
const { cadastrarUsuarios } = require("./controladores/usuarios")

const rotas = express()

rotas.post('/usuario', cadastrarUsuarios)

rotas.get('/carro', listarCarros)
rotas.get('/carro/:id', detalharCarro)
rotas.post('/carro', cadastrarCarro)
rotas.put('/carro/:id', atualizarCarro)
rotas.delete('/carro/:id', excluirCarro)

module.exports = rotas