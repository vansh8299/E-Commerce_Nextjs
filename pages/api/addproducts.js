import connectDb from "../../middleware/mongoose"
import Product from "../../modals/Product"

const handler = async(req, res) => {
    if (req.method == 'POST') {
        console.log('Request body:', req.body);  // Log the request body
        
        if (!Array.isArray(req.body)) {
            return res.status(400).json({ error: "Request body should be an array of products." });
        }

        for (let i = 0; i < req.body.length; i++) {
            let p = new Product({
                title: req.body[i].title,
                slug: req.body[i].slug,
                desc: req.body[i].desc,
                img: req.body[i].img,
                category: req.body[i].category,
                size: req.body[i].size,
                color: req.body[i].color,
                price: req.body[i].price,
                availableQty: req.body[i].availableQty
            });
            console.log('Product to be saved:', p);
            await p.save();
        }
        
        res.status(200).json(req.body);
    } else {
        res.status(404).json({ error: "This method is not allowed." });
    }
}

export default connectDb(handler);
