function hasUser() {
    return (req, res, next) => {
        if(req.user) {
            next();
        } else {
            res.redirect('/auth/login');
        }
    };
}

function isGuest(){
    return (req,res,next) => {
        if(req.user && req.url != '/logout'){
            res.redirect('/')  //TODO: Check assignment for correct redirect
        } else {
            next();
        }
    }
}

module.exports = {
    hasUser,
    isGuest
}