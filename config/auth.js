module.exports = {
    ensureAuthefication : function(req,res,next){
        if(req.isAuthenfication()){
            return next();
        }
        req.flash('error_msg','Please log in');
        res.redirect('/users/login')
    }
}