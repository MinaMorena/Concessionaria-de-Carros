const pool = require('../conexao')
const bcrypt = require('bcrypt')

const cadastrarUsuarios = async (req, res) => {
    const { nome, email, senha } = req.body

    if (!nome || !email || !senha) {
        return res.status(400).json({ mensagem: 'Os campos nome, e-mail e senha são obrigatórios.' })
    }

    try {
        const senhaCriptografada = await bcrypt.hash(senha, 10)

        const novoUsuario = await pool.query('insert into usuarios (nome, email, senha) values ($1, $2, $3) returning *',
            [nome, email, senhaCriptografada]
        )

        return res.status(201).json(novoUsuario.rows[0])
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
}

const obterPerfil = async (req, res) => {
    return res.json(req.usuario)
}

module.exports = { cadastrarUsuarios, obterPerfil }