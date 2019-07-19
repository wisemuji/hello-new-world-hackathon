module.exports = (app, Reservations) => {
    app.get('/', async(req, res) => {
        console.log("server conn");
        res.send("서버 연결됨");
    })
    .get('/:page', async(req, res) => {
        const page = req.params.page;
        console.log(page);
        console.log('id: ' + req.session.user_id)
        if(req.session.user_id == 'root') {
            var result = await Reservations.find({school_token: req.body.school_token})
            res.render('root', {item: result});
        }
        else if(page == 'index') res.redirect('/');
        else if(page == 'form'||page == 'signup'||page == 'login'){
            res.render(page + '');
        } 
        else {
          res.status(404).send("<script type='text/javascript'>alert(잘못된 경로입니다.);</script>");
        }
    });
}