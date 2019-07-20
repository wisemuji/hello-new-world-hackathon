module.exports = (app, Reservations) => {
    app.get('/', async(req, res) => {
        if(req.session.logined) {
            res.render('index', {id: req.session.user_id});
        } else {
            res.render('index', {id: false});
        }
    })
    .get('/:page', async(req, res) => {
        const page = req.params.page;
        console.log(page);
        console.log('id: ' + req.session.user_id)
        if(req.session.user_id == 'root') {
            var result = await Reservations.find({school_token: req.body.school_token})
            res.render('root', {id: req.session.user_id, item: result});
        }
        else if(page == 'index') res.redirect('/');
        else if(page == 'yeah'){
            if(!req.session.logined) {
                res.send('<script type="text/javascript">alert("로그인 후 이용하실 수 있습니다."); history.back();</script>');
            } else{
                res.render(page + '', {id: req.session.user_id});
            }
        }
        else if(page == 'signup'||page == 'apply'||page == 'login'||page == 'reservation'){
            if(req.session.logined) {
                res.render(page + '', {id: req.session.user_id});
            } else {
                res.render(page + '', {id: false});
            }
        } 
        else {
          res.status(404).send("<script type='text/javascript'>alert(잘못된 경로입니다.);</script>");
        }
    });
}