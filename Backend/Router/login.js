

const {router} = require('express');

const loginRouter = router();

loginRouter.post('/login', (req, res) => {
    const { username, password } = req.body;
    msg: 'Login successful',
    res.json({ username, password });
});

module.exports = loginRouter;