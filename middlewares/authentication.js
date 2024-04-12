const { validateToken } = require("../services/authentication");

//This is the check authentication in the cookie
function chechForAuthenticationCookie(cookieName){
    return (req,res,next)=>{
        const tokenCookieValue=req.cookie[cookieName];
        if(!tokenCookieValue){
            next();
        }

        try {
            const userPayload=validateToken(tokenCookieValue);
            req.user=userPayload;
        } catch (error) { }
        next()
    }
}

module.exports={
    chechForAuthenticationCookie,
}