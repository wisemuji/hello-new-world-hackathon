module.exports = (app, Reservations) => {
    app.post('/getAllReservations', async(req, res) => { 
        var result = await Reservations.find({school_token: req.body.school_token})
        res.send(result)
    });

};