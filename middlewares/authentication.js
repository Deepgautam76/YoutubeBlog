const { validateToken } = require("../services/authentication");

function chechForAuthenticationCookie(cookieName){
    return (req,res,next)=>{
        const tokenCookieValue=req.cookies[cookieName];
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