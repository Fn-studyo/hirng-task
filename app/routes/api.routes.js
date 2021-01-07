const { check } = require("express-validator");
const api = require("../controllers/ApiController.js");

module.exports = (app) => {
    app.post('/api/csv', [
        check('csv.url').isURL().trim().bail(),
        check('csv.select_fields').isArray().withMessage('must be an array or empty empty').bail(),
    ], api.actionCsv);
}