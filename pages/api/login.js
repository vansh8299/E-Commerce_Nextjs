import User from "../../modals/User";
import connectDb from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
    if (req.method == 'POST') {
        try {
            
            console.log(req.body);
            
        
            let user = await User.findOne({ "email": req.body.email });
            
          
            if (!user) {
                return res.status(400).json({ success: false, error: "No user found" });
            }

            const bytes = CryptoJS.AES.decrypt(user.password, 'secret123');
            let decryptedPass = bytes.toString(CryptoJS.enc.Utf8);

           
            if (req.body.password === decryptedPass) {
          
                var token = jwt.sign({ success: true, email: user.email, name: user.name }, 'jwtsecret', {expiresIn: "2d"});
                return res.status(200).json({ success: true, token });
            } else {
                return res.status(400).json({ success: false, error: "Invalid Credentials" });
            }
        } catch (err) {
            console.error("Error occurred:", err);
            return res.status(500).json({ success: false, error: "Internal Server Error" });
        }
    } else {
        return res.status(400).json({ error: "This method is not supported" });
    }
};

export default connectDb(handler);
