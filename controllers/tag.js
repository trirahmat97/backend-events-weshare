const Tag = require('../models/tag');
const response = require('../utils/response');
const message = require('../utils/responseMessage');

exports.getAllTag = async (req, res) => {
    try {
        const tag = await Tag.findAll();
        res.status(200).json(response.ok(tag, message.fetch));
    } catch (err) {
        res.status(200).json(response.bad(err.message));
    }
}

exports.createTag = async (req, res) => {
    try {
        const { name, description } = req.body;
        const dataTag = await Tag.build({ name, description });
        const saveTag = await dataTag.save();
        if (!saveTag) {
            throw new Error(message.invalidCreate);
        }
        res.status(201).json(response.create(saveTag, message.cretae));
    } catch (err) {
        res.status(200).json(response.bad(err.message));
    }
}

exports.updateTag = async (req, res) => {
    try {
        const { id, name, description } = req.body;
        const findTag = await Tag.findByPk(id);
        if (!findTag) {
            res.status(404).json(response.nodeFound(message.notFound));
        }
        findTag.name = name;
        findTag.description = description;
        const savetag = await findTag.save();
        if (!savetag) {
            throw new Error(message.invalidCreate);
        }
        res.status(200).json(response.update(savetag, message.update));
    } catch (err) {
        res.status(200).json(response.bad(err.message));
    }
}

exports.deleteTag = async (req, res) => {
    try {
        const id = req.params.id;
        const findTag = await Tag.findByPk(id);
        if (!findTag) {
            res.status(404).json(response.nodeFound(message.notFound));
        }
        const deleteTag = await findTag.destroy();
        if (!deleteTag) {
            throw new Error(message.invalidDelete)
        }
        res.status(200).json(response.okDelete(message.delete));
    } catch (err) {
        res.status(200).json(response.bad(err.message));
    }
};