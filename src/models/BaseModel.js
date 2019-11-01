const { Model } = require('objection')
const visibilityPlugin = require('objection-visibility').default

module.exports = class BaseModel extends visibilityPlugin(Model) {}
