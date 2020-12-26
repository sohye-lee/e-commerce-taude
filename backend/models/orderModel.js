import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        orderItems: [{
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            product: { type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            }
        }],
        shippingAddress: {
            fullname: { type: String, required: true },
            street: { type: String, required: true },
            city: { type: String, required: true },
            stateName: { type: String, required: true },
            zip: { type: String, required: true },
            country: { type: String, required: true },
        },
        paymentMethod: { type: String, required: true },
        itemsPrice: { type: Number, required: true },
        shippingFee: { type: Number, required: true },
        tax: { type: Number, required: true },
        total: { type: Number, required: true },
        user: { type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        isPaid: { type: Boolean, default: false},
        paidAt: { type: Date},
        isDelivered: { type: Boolean, default: false},
        deliveredAt: { type: Date},

    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;