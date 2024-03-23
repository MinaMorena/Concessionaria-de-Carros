const express = require("express")
const { listarCarros, detalharCarro, cadastrarCarro, atualizarCarro, excluirCarro } = require("./controladores/carros")
const { cadastrarUsuarios, obterPerfil } = require("./controladores/usuarios")
const { login } = require("./controladores/login")
const verificarUsuarioLogado = require("./intermediarios/autenticacao")

const rotas = express()

rotas.post('/usuario', cadastrarUsuarios)
rotas.post('/login', login)

rotas.use(verificarUsuarioLogado)

rotas.get('/perfil', obterPerfil)

rotas.get('/carro', listarCarros)
rotas.get('/carro/:id', detalharCarro)
rotas.post('/carro', cadastrarCarro)
rotas.put('/carro/:id', atualizarCarro)
rotas.delete('/carro/:id', excluirCarro)

module.exports = rotas