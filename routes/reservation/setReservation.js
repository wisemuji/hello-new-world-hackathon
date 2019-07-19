import config from '../../config';

module.exports = (app, Reservations) => {
    app.post('/setReservation', async(req, res) => {
        let reservation = new Reservations(req.body);
        try {
            var result = await reservation.save();
        } catch (e) {
            if (e instanceof user_duplicate) return res.status(409).json({ message: "already exist" });
            if (e instanceof ValidationError) return res.status(400).json({ message: e.message });
            if (e instanceof paramsError) return res.status(400).json({ message: e.message });
        }
        res.status(200).send(reservation)
    });

};