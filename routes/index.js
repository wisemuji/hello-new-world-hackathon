module.exports = (app) => {
    app.get('/', async(req, res) => {
        console.log("server conn");
        res.send("서버 연결됨");
    });
}