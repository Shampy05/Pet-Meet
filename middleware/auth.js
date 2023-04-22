import jwt from 'jsonwebtoken'

export const verifyToken = async (req, res, next) => {
    try {
        // get the token from the header of the request so that it can be verified by the server
        let token = req.header('Authorization')

        if (!token) return res.status(403).json({msg: "Invalid Authentication"})

        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length)
        }

        req.user = jwt.verify(token, process.env.JWT_SECRET);

        next()



    } catch (err) {
        res.status(500).json({error: err.message})
    }
}