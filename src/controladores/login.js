const pool = require('../conexao')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const senhaJwt = require('../senhaJwt')

const login = async (req, res) => {
    const { email, senha } = req.body

    try {
        const usuario = await pool.query('select * from usuarios where email = $1', [email])

        if (usuario.rowCount < 1) {
            return res.status(400).json({ mensagem: 'Email ou senha invalida.' })
        }

        const senhaValida = await bcrypt.compare(senha, usuario.rows[0].senha)

        if (!senhaValida) {
            return res.status(400).json({ mensagem: 'Email ou senha invalida.' })
        }

        const token = jwt.sign({ id: usuario.rows[0].id }, senhaJwt, { expiresIn: '8h' })

        const { senha: _, ...usuarioLogado } = usuario.rows[0]

        return res.json({ usuario: usuarioLogado, token })
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
}

module.exports = { login }