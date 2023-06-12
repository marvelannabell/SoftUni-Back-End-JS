function isUser() {
    return (req, res, next) => {

        if (req.user) {
            next();
        } else {
            res.redirect('/auth/login')
        }
    };
};

function isGuest() {

    return (req, res, next) => {

        if (req.user) {
            res.redirect('/')//TODO check assignement for correct redirect 
        } else {
            next()
        }
    };
};

module.exports = {
    isUser,
    isGuest,
}