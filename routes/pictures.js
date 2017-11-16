var express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/:i18nkey', function (req, res) {
    var alt = req.i18n.__(req.params.i18nkey + 'Alt');
    var desc = req.i18n.__(req.params.i18nkey + 'Desc');
    var data = {'alt' : alt, 'desc' : desc};
    res.json(data);
});

module.exports = router;