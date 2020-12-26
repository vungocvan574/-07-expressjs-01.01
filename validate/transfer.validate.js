module.exports.postCreate = function(req, res, next) {
    var errors = [];

    if (!req.body.accountId) {
        errors.push('Account is required');
    };

    if (!req.body.amount) {
        errors.push('Amount is required');
    };

    if (errors.length) {
        res.render('transfer/create', {
            errors: errors,
            values: req.body
        });
        return;
    };

    next();
};