const { Op } = require("sequelize");
const Event = require('../models/event');
const response = require('../utils/response');
const message = require('../utils/responseMessage');
const EventType = require('../models/eventType');
const EventCategory = require('../models/eventCategory');
const Tag = require('../models/tag');

exports.findAllEventById = async (req, res) => {
    try {
        const userId = req.params.userId;
        const findEventUserId = await Event.findAll({
            where: { userId },
            include: [EventType, EventCategory, {
                model: Tag,
                through: {
                    attributes: []
                }
            }]
        });
        res.status(200).json(response.ok(findEventUserId, message.fetch));
    } catch (err) {
        res.status(400).json(response.bad(err.message));
    }
};

exports.findAllEvent = async (req, res) => {
    try {
        const findEvent = await Event.findAll({
            include: [EventType, EventCategory, {
                model: Tag,
                through: {
                    attributes: []
                }
            }]
        });
        res.status(200).json(response.ok(findEvent, message.fetch));
    } catch (err) {
        res.status(400).json(response.bad(err.message));
    }
};

exports.findAllEventTags = async (req, res) => {
    try {
        const { tagId } = req.body;
        console.log(tagId);
        const findEvent = await Event.findAll({
            include: [EventType, EventCategory, {
                model: Tag,
                where: { id: { [Op.in]: tagId } },
                through: {
                    attributes: []
                }
            }]
        });
        res.status(200).json(response.ok(findEvent, message.fetch));
    } catch (err) {
        res.status(400).json(response.bad(err.message));
    }
};

exports.cretaeEvent = async (req, res) => {
    try {
        const { userId, name, location, lat, long, eventTypeId, eventCategoryId, tags } = req.body;
        const createEvent = await Event.create({
            userId,
            name,
            location,
            lat,
            long,
            eventTypeId,
            eventCategoryId
        });
        const findTags = await Tag.findAll({ where: { id: { [Op.in]: tags } } });
        if (findTags.length > 0) {
            await createEvent.addTag(findTags);
        }
        const eventResult = await Event.findOne({
            where: { id: createEvent.id },
            include: [EventType, EventCategory, {
                model: Tag,
                through: {
                    attributes: []
                }
            }]
        })
        res.status(200).json(response.create(eventResult, message.cretae));
    } catch (err) {
        res.status(400).json(response.bad(err.message));
    }
}

exports.updateEvent = async (req, res) => {
    try {
        const { id, userId, name, location, lat, long, eventTypeId, eventCategoryId, tags } = req.body;
        const findEvent = await Event.findByPk(id);
        if (!findEvent) {
            res.status(404).json(response.nodeFound(message.notFound));
        }
        await findEvent.update({ userId, name, location, lat, long, eventTypeId, eventCategoryId });
        const findTags = await Tag.findAll({ where: { id: { [Op.in]: tags } } });
        if (findTags.length > 0) {
            await findEvent.setTags(findTags);
        }
        const eventResult = await Event.findOne({
            where: { id: findEvent.id },
            include: [EventType, EventCategory, {
                model: Tag,
                through: {
                    attributes: []
                }
            }]
        })
        res.status(200).json(response.create(eventResult, message.cretae));
    } catch (err) {
        res.status(400).json(response.bad(err.message));
    }
}