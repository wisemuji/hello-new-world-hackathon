module.exports = (app) => {
    app.get('/', async(req, res) => {
        console.log("server conn");
        res.send("서버 연결됨");
    })
    .get('/:page', function (req, res) {
        const page = req.params.page;
        console.log(page);
        if(page == 'index') res.redirect('/');
        else if(page == 'form'||page == 'signup'||page == 'login'||page == 'root'){
            res.render(page + '');
        } 
        else {
          res.status(404).send("<script type='text/javascript'>alert(잘못된 경로입니다.);</script>");
        }
    });
}