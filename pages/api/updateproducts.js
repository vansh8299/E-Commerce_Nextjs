import connectDb from "../../middleware/mongoose"
import Product from "../../modals/Product"

const handler = async(req, res) => {
    if (req.method == 'POST') {
        console.log('Request body:', req.body);  // Log the request body
        
        if (!Array.isArray(req.body)) {
            return res.status(400).json({ error: "Request body should be an array of products." });
        }

        for (let i = 0; i < req.body.length; i++) {
            let p = await Product.findByIdAndUpdate(req.body[i]._id, req.body[i])
           
        }
        
        res.status(200).json(req.body);
    } else {
        res.status(404).json({ error: "This method is not allowed." });
    }
}

export default connectDb(handler);
