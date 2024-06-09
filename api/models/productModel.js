import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
        trim:true,
        maxLength:[100, "product name cannot exceed 100 charectrs"],
        unique: true
    },
    price: {
        type: Number, 
        default: 0.0,
    },
    description: {
        type: String,
        required: [ true, "please enter product description"]
    },
    images:[
        {
        image: {
            type:String,
            required: [true,"Image is required"],
        },
        }
    ],
    category:{
        type: String,
        required: [true, "Please enter product category"],
        enum: {
            values: [
                'Electronics',
                'Mobile Phones',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                'Books',
                'Clothes/Shoes',
                'Beauty/Health',
                'Vehicles',
                'Sports',
                'Outdoor',
                'Home',
            ],
            message: "Please select correct category"
        }
    },
    seller:{
        type: String,
        required:[true, "Please enter Seller details"]
    },
    stock:{
        type: Number, 
        required: [true, "Please enter product stock"],
        maxLength: [20, "Product stock cannot exceed 20"]
    },
    numofReviews:{
        type:Number,
        default:0
    },
    reviews: [
        {
            name:{
                type:String,
                required: true
            },
            rating:{
                type:String,
                required:true,
            },
            comment: {
                type:String,
                required:true
            }
        }
    ],
    createdAt:{
        type: Date,
        default:Date.now()
    }
})

let schema = mongoose.model( 'Product', productSchema );

export default schema;