const authUser =(username,password,cb)=>{
    if (username==="muhammed" && password ==="cansoy") {
        const loggedUser ={name:"muhammed",surname:"cansoy",city:"ankara",age:36}
        return cb(null,loggedUser)
    }
    else{
            cb(null,false)
    }
}

export {
    authUser
}