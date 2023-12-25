import jwt from "jsonwebtoken"
// Yeni bir token oluşması için muhakkak verify objesi parçalanmalıdır

const isAuthJwt=(req,res,next)=>{
    try {
        const refresh_token=req.cookies.refresh_token
        const verify=jwt.verify(refresh_token,process.env.REFRESH_JWT_SECRET)
        const userObj={
            name:verify.name,
            surname:verify.surname,
            city:verify.city,
            age:verify.age
        }
        const newRefreshToken=jwt.sign(userObj,process.env.REFRESH_JWT_SECRET)
        req.refresh_token=newRefreshToken
        return next()
    } catch (error) {
       return res.redirect("/logout")
    }
}

export{
    isAuthJwt
}