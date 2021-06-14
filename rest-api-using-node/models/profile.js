const mongoose = require("mongoose");
const ProfileSchema = mongoose.Schema({
    name:{ type: String, required: true },
    job: { type: String, required: true },
    date:{ type: Date, default: Date.now }

});

module.exports = mongoose.model("Profiles",ProfileSchema);