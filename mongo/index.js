import mongoose from 'mongoose';
import config from '../config';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://'+config.mongo_id+':'+config.mongo_pass+'@ds237955.mlab.com:37955/gura', { useNewUrlParser: true }).then(() => {
console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});
mongoose.Promise = global.Promise;

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() { console.log("Mongo On"); });

let UserSchema = mongoose.Schema({ //회원
    email: { type: String }, //이메일
    password: { type: String }, //비밀번호
});

let ReservationSchema = mongoose.Schema({ //예약
    school_token: { type: String },
    user_email: { type: String }
});

let SchoolSchema = mongoose.Schema({ //예약
    token: { type: String },
    id: { type: String }, //ID
    password: { type: String } //비밀번호
});

require('./err')(UserSchema);

let Users = mongoose.model("users", UserSchema);
let Reservations = mongoose.model("reservations", ReservationSchema);
let Schools = mongoose.model("schools", SchoolSchema);

export { Users, Reservations, Schools };

export default db;