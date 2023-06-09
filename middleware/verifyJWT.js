import jwt from 'jsonwebtoken';

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return next();
	//return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (!err) {
				req.userInfo = decoded;
				// return res.sendStatus(403); //invalid token
			}
            // req.userInfo = decoded;
            return next();
        }
    );
}

export default verifyJWT;