const jwt = require('jsonwebtoken');

const tokenVerify = (req, res, next)=>{
      const header = req.headers['authorization'];
      req.token = header;
      jwt.verify(req.token, process.env.TOKEN_SECRET_KET, (err, data)=>{
            if(err){
                  res.json({"message":"invalid token"});
            } else {
                  next();
            }
      });
}


module.exports = tokenVerify;