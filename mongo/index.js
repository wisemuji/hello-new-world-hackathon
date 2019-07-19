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
    email: { type: String }, //이름
    password: { type: String }, //비밀번호
});

require('./err')(UserSchema);

let Users = mongoose.model("users", UserSchema);

export { Users };

export default db;