const crypto = require("crypto");

const hash = (password , secret = "Batool") => {
    return crypto.createHmac("sha256" , secret).update(password).digest("hex");
}

module.exports = hash;