import config from '../../config';

module.exports = (app, Users) => {
    app.post('/signup', async(req, res) => {
            var user = new Users(req.body);
            try {
                var result = await user.save();
            } catch (e) {
                if (e instanceof user_duplicate) return res.status(409).json({ message: "already exist" });
                if (e instanceof ValidationError) return res.status(400).json({ message: e.message });
                if (e instanceof paramsError) return res.status(400).json({ message: e.message });
            }
            res.status(200).send(user)
        })
        .post('/signin', async(req, res) => {
            var result = await Users.findOne(req.body)
            if (!result) {
                res.status(400).json({
                    message: "login failed"
                });
            } else {
                req.session.logined = true;
                req.session.user_id = result.id;
                res.status(200).json({
                    message: "success"
                });
            }
        })
        .post('/delUser', async(req, res) => {
            var result = await Users.deleteOne({ token: req.body.token });
            if (!result.ok) return res.status(500).json({ message: "ERR!" })
            else return res.status(200).json({ message: "success!" })
        })
        .post('/aa', async(req, res) => {
            var result = await Users.find()
            res.send(result)
        })
        .post('/logout', (req, res) => {
            var result = req.session.destroy();
            res.clearCookie(config.key);
            res.send(result)
        });

};