var express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/:i18nkeybase', function (req, res) {
    var alt = req.i18n.__(req.params.i18nkeybase + 'Alt');
    var desc = req.i18n.__(req.params.i18nkeybase + 'Desc');
    var data = {'alt' : alt, 'desc' : desc};
    return res.json(data);
});

module.exports = router;