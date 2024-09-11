const checkUserSession = (req, res, next) => {
          if (req.session && req.session.user) {
                    next();
          } else {
                    console.log('Unauthorized');
                    res.status(401).json({ message: 'You must be logged in!' });
          }
};
export default checkUserSession;