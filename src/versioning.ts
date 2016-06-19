var versioning = require('express-route-versioning');

versioning.use({
    'header': 'accept',
    'grab': /vnd.neolik.com\+json; version=(\d+)(,|$)/,
    'error': 406
});

module.exports = versioning;