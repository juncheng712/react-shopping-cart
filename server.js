const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");
require('dotenv').config();

const app = express();
app.use(bodyParser.json());


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const Product = mongoose.model("products", new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    title: String,
    image: String,
    description: String,
    price: Number,
    availableSizes: [String],

}))

app.get("/api/products", async (req, res) => {
    const products = await Product.find({});
    res.send(products);
});

app.post("/api/products", async (req, res) => {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.send(savedProduct);
});

app.delete("/api/products/:id", async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.send(deletedProduct);
})

const Order = mongoose.model("order", new mongoose.Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    email: String,
    name: String,
    address: String,
    total: Number,
    cartItems: [{
        _id: String,
        title: String,
        price: Number,
        count: Number
    }]
},
{
    timestamps: true,
}))

// app.get("")

app.post("/api/orders", async(req, res) => {
    if (!req.body.name
        ||
        !req.body.email
        ||
        !req.body.address
        ||
        !req.body.total
        ||
        !req.body.cartItems
        ) {
            return res.send({message: "Data is required"})
        }
        const order = await Order(req.body).save();
        res.send(order)
})

// app.delete()

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("serve at http://localhost:5000"));