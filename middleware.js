import jwt from 'jsonwebtoken';

const checkToken = (req, res, next) => {
          const token = req.headers.authorization?.split(' ')[1];
          console.log(token);
          if (!token) {
              return res.status(401).json({ message: 'No token provided' });
          }
      
          jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
              if (err) {
                  return res.status(401).json({ message: 'Invalid token' });
              }
                    req.user = decoded;
                    console.log(req.user);
              next();
          });
      };
      
export default checkToken;
      