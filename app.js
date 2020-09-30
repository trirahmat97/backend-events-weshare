const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const multer = require('multer');

//model
const Event = require('./models/event');
const EventType = require('./models/eventType');
const EventCategory = require('./models/eventCategory');
const EventTag = require('./models/eventTag');
const Tag = require('./models/tag');
const UserInterest = require('./models/userInterest');

//router
const config = require('./utils/config');
const connection = require('./db/connection');
const eventCategory = require('./routes/eventCategory');
const userInterest = require('./routes/userInterest');
const eventType = require('./routes/eventType');
const tagRouter = require('./routes/tag');
const eventRouter = require('./routes/event');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//config upload
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, Date.now() + '-' + name);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

app.use(multer({
    storage: fileStorage,
    fileFilter: fileFilter
}).single('image'));

//config router
app.use('/images', express.static(path.join("images")));
app.use('/event/event_category', eventCategory);
app.use('/event/user_interest', userInterest);
app.use('/event/event_type', eventType);
app.use('/event/tag', tagRouter);
app.use('/event', eventRouter);

//relation
Event.belongsTo(EventType);
EventType.hasOne(Event, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
});
Event.belongsTo(EventCategory);
EventCategory.hasOne(Event, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
});
UserInterest.belongsTo(EventCategory);
EventCategory.hasOne(UserInterest, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
});
Event.belongsToMany(Tag, { through: EventTag });
Tag.belongsToMany(Event, { through: EventTag });

const port = config.port || 5000;
app.listen(port, async () => {
    try {
        await connection.authenticate();
        await connection.sync({ force: false });
        console.log('Connection has been connect in database and server port: ' + port);
    } catch (error) {
        console.error('Unable to connect to the database: ', error.message);
    }
});