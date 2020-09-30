const EventCategory = require('../models/eventCategory');
const response = require('../utils/response');
const fileHelper = require('../utils/file');

const responseMessage = {
    cretae: 'Create category success',
    invalidCreate: 'Invalid create category',
    notFound: 'Category not found!',
    delete: 'Delete has ben success!',
    update: 'Update has ben success!',
    fetch: 'Fetch All has ben success!',
};

exports.createCategory = async (req, res) => {
    try {
        const file = req.file;
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
            throw new Error(responseMessage.invalidCreate);
        }
        res.status(201).json(response.create(resCategory, responseMessage.cretae));
    } catch (err) {
        res.status(200).json(response.bad(err.message));
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await EventCategory.findOne({ where: { id } });
        if (!category) {
            res.status(404).json(response.nodeFound(responseMessage.notFound));
        }
        if (category.pathIcon) {
            fileHelper.deleteFile(category.pathIcon);
        }
        const delCategory = await category.destroy();
        if (delCategory) {
            res.status(200).json(response.okDelete(responseMessage.delete));
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
            res.status(404).json(response.nodeFound(responseMessage.notFound));
        }
        category.name = name;
        category.description = description;
        category.parent_id = parent_id;
        if (file) {
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
        res.status(200).json(response.update(saveCategory, responseMessage.update));
    } catch (err) {
        res.status(200).json(response.bad(err.message));
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
        res.status(200).json(response.update(eventCategory, responseMessage.fetch));
    } catch (err) {
        res.status(200).json(response.bad(err.message));
    }
}