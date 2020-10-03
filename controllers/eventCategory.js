const EventCategory = require('../models/eventCategory');
const response = require('../utils/response');
const fileHelper = require('../utils/file');
const message = require('../utils/responseMessage');

exports.createCategory = async (req, res) => {
    const file = req.file;
    try {
        const url = req.protocol + '://' + req.get('host');
        const { name, description, parent_id } = req.body;
        const cateogry = await EventCategory.build({
            name,
            icon: file ? url + '/images/' + req.file.filename : '',
            pathIcon: file ? 'images/' + req.file.filename : '',
            description,
            parent_id
        });
        const resCategory = await cateogry.save();
        if (!resCategory) {
            throw new Error(message.invalidCreate);
        }
        res.status(201).json(response.create(resCategory, message.cretae));
    } catch (err) {
        const error = err.errors[0].message;
        if (file) {
            await fileHelper.deleteFile('images/' + file.filename);
        }
        res.status(400).json(response.bad(error ? error : err.message));
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await EventCategory.findOne({ where: { id } });
        if (!category) {
            res.status(404).json(response.nodeFound(message.notFound));
        }
        if (category.pathIcon) {
            fileHelper.deleteFile(category.pathIcon);
        }
        const delCategory = await category.destroy();
        if (delCategory) {
            res.status(200).json(response.okDelete(message.delete));
        }
    } catch (err) {
        res.status(200).json(response.bad(err.message));
    }
}

exports.editCategory = async (req, res) => {
    try {
        const url = req.protocol + '://' + req.get('host');
        const { name, description, parent_id } = req.body;
        const file = req.file;
        const id = req.params.id;
        const category = await EventCategory.findByPk(id);
        if (!category) {
            res.status(404).json(response.nodeFound(message.notFound));
        }
        category.name = name;
        category.description = description;
        category.parent_id = parent_id;
        if (file && category.pathIcon) {
            if (category.pathIcon) {
                fileHelper.deleteFile(category.pathIcon);
            }
            category.icon = url + '/images/' + file.filename;
            category.pathIcon = 'images/' + file.filename;
        }
        const saveCategory = await category.save();
        if (!saveCategory) {
            throw new Error('update failed!');
        }
        res.status(200).json(response.update(saveCategory, message.update));
    } catch (err) {
        const error = err.errors[0].message;
        if (file) {
            await fileHelper.deleteFile('images/' + file.filename);
        }
        res.status(400).json(response.bad(error ? error : err.message));
    }
}

exports.fetchAll = async (req, res) => {
    try {
        const eventCategory = await EventCategory.findAll({
            where: { parent_id: null },
            include: [{
                model: EventCategory,
                as: 'Child',
                include: [{
                    model: EventCategory,
                    as: 'Child2',
                }]
            }]
        });
        res.status(200).json(response.update(eventCategory, message.fetch));
    } catch (err) {
        res.status(200).json(response.bad(err.message));
    }
}