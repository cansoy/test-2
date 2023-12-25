const isAuthSession =(req,res,next)=>{
    console.log(req.session)
    if (!req.isAuthenticated()) {
        return res.json({what:"are-you-doing!"})
    }else{
       return next()
    }
}

export {
    isAuthSession
}