const UserInterest = require('../models/userInterest');
const EventCategory = require('../models/eventCategory');
const response = require('../utils/response');
const message = require('../utils/responseMessage');

exports.fetchUserInterestById = async (req, res) => {
    try {
        const userId = req.params.userId;
        const userInterest = await UserInterest.findAll({
            where: { userId },
            attributes: ['id'],
            include: [{
                model: EventCategory,
                attributes: ['name', 'icon']
            }],
        });
        res.status(200).json(response.ok(userInterest, message.inquiry));
    } catch {
        res.status(200).json(response.bad(err.message));
    }
};

exports.creareUserInterest = async (req, res) => {
    try {
        const { userId, eventCategoryId } = req.body;
        const category = await EventCategory.findByPk(eventCategoryId);
        if (!category) {
            res.status(404).json(response.nodeFound('Category not found!'));
        }
        const userInterestBuild = await UserInterest.build({
            userId, eventCategoryId
        });
        const userInterestSave = await userInterestBuild.save();
        if (!userInterestSave) {
            throw new Error(message.invalidCreate);
        }
        res.status(201).json(response.create(userInterestSave, message.cretae));
    } catch (err) {
        res.status(200).json(response.bad(err.message));
    }
};

exports.updateUserInterest = async (req, res) => {
    try {
        const { id, userId, eventCategoryId } = req.body;
        const category = await EventCategory.findByPk(eventCategoryId);
        if (!category) {
            res.status(404).json(response.nodeFound('Category not found!'));
        };
        const userInterest = await UserInterest.findByPk(id);
        if (!userInterest) {
            res.status(404).json(response.nodeFound('User interest not found!'));
        }
        userInterest.userId = userId;
        userInterest.eventCategoryId = eventCategoryId;
        const saveUserInterest = await userInterest.save();
        if (!saveUserInterest) {
            throw new Error('update failed!');
        }
        res.status(200).json(response.update(saveUserInterest, message.update));
    } catch (err) {
        res.status(200).json(response.bad(err.message));
    }
};

exports.deleteUserInterst = async (req, res) => {
    try {
        const id = req.params.id;
        const userInterest = await UserInterest.findByPk(id);
        if (!userInterest) {
            res.status(404).json(response.nodeFound('User Interest not found!'));
        };
        const deleteUserInterset = await userInterest.destroy();
        if (deleteUserInterset) {
            res.status(200).json(response.okDelete(message.delete));
        }
    } catch (err) {
        res.status(200).json(response.bad(err.message));
    }
}

