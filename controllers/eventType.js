const EventType = require('../models/eventType');
const response = require('../utils/response');
const message = require('../utils/responseMessage');

exports.getAll = async (req, res) => {
    try {
        const eventType = await EventType.findAll();
        res.status(200).json(response.ok(eventType, message.fetch));
    } catch (err) {
        res.status(200).json(response.bad(err.message));
    }
};

exports.cretaeEventType = async (req, res) => {
    try {
        const { name, type } = req.body;
        const buildCreate = await EventType.build({ name, type });
        const saveCreate = await buildCreate.save();
        res.status(200).json(response.create(saveCreate, message.cretae));
    } catch (err) {
        res.status(200).json(response.bad(err.message));
    }
};

exports.updateCreateType = async (req, res) => {
    try {
        const { id, name, type } = req.body;
        const findById = await EventType.findByPk(id);
        if (!findById) {
            res.status(404).json(response.nodeFound('Event type not found!'));
        }
        findById.name = name;
        findById.type = type;
        const saveEvent = await findById.save();
        res.status(200).json(response.update(saveEvent, message.update));
    } catch (err) {
        res.status(200).json(response.bad(err.message));
    }
}

exports.deleteEventType = async (req, res) => {
    try {
        const id = req.params.id;
        const findById = await EventType.findByPk(id);
        if (!findById) {
            res.status(404).json(response.nodeFound('Event type not found!'));
        }
        const deleteEvent = await findById.destroy();
        if (deleteEvent) {
            res.status(200).json(response.okDelete(message.delete));
        }
    } catch (err) {
        res.status(200).json(response.bad(err.message));
    }
}