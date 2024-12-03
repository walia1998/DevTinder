const authAdmin = (req,res,next) => {
    console.log("Admin is getting checked")
    const token = "xyz";
    const isAdminAthorised = token === "xyz";
    if(!isAdminAthorised) {
        res.status(401).send("Unauthorised")
    }else {
        next();
    }
}

const userAuth = (req,res,next) => {
    console.log("User is getting checked");

    const token = "sania";
    const isUserAuhtorised = token === "sania";
    if(!isUserAuhtorised) {
        res.status(401).send("Unauthorised request")
    }else {
        next();
    }
}

module.exports = {
    authAdmin,
    userAuth
}