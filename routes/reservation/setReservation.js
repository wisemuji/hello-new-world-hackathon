module.exports = (app, Reservations) => {
    app.post('/setReservation', async(req, res) => {
        let reservation = new Reservations(req.body);
        reservation.school_name = '수현초등학교';
        try {
            var result = await reservation.save();
        } catch (e) {
            if (e instanceof user_duplicate) return res.status(409).json({ message: "already exist" });
            if (e instanceof ValidationError) return res.status(400).json({ message: e.message });
            if (e instanceof paramsError) return res.status(400).json({ message: e.message });
        }
        res.send('<script type="text/javascript">alert("예약이 완료되었습니다."); location.href = "/index";</script>');
    });

};