const connection = require('../db/connection');
const EventTag = connection.define('event_tag', {}, { timestamp: false });
module.exports = EventTag;