"use strict";

const i18n = require("i18n");

i18n.configure({
    locales:['en', 'ja', 'ko'],
    directory: __dirname + '/locale'
});

module.exports = i18n;