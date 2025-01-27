const Image = require('../models/itens/Imagem.js');

exports.createImage = async (req, res) =>{
    const {
        titulo, descricao, imagemBase64 
    } = req.body;
    if (!titulo || !descricao || !imagemBase64) {
        return res.status(400).json({erro:'Todos os campos são obrigatórios'});
    }

    try{
        const novaImagem = new Image({titulo, descricao, imagemBase64});
        await novaImagem.save();
        res.status(201).json({ message: 'Imagem adicionada com sucesso!'});
    } catch (err) {
        res.status(500).json({ error: 'Erro ao salvar a imagem.'});
    }
};

exports.listImages = async (req, res) => {
    try {
        const imagens = await Image.find({}, 'titulo descricao imagemBase64');
        res.status(200).json(imagens);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao listar imagens.'});
    }
};