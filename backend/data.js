import bcrypt from 'bcryptjs';

const data = {
    products: [
        {
            brand: "taude",
            name: "Joy",
            category: "tote bag",
            imageUrl: ["/images/products/tote30.jpg","/images/products/tote30-1.jpg","/images/products/tote30-2.jpg"],
            description: "Simple color and modern shape",
            color: "pink",
            material: "canvas",
            price: 20.90,
            countInStock: 20
        },
        {
            brand: "taude",
            name: "Black Dot",
            category: "tote bag",
            imageUrl: ["/images/products/tote29.jpg","/images/products/tote29-1.jpg"],
            description: "Simple color and modern shape",
            color: "black",
            material: "leather",
            price: 45.90,
            countInStock: 20
        },
        {
            brand: "taude",
            name: "Cute Box",
            category: "tote bag",
            imageUrl: ["/images/products/tote27.jpg","/images/products/tote27-1.jpg","/images/products/tote27-2.jpg"],
            description: "High quality genuine leather",
            color: "white",
            material: "leather",
            price: 62.90,
            countInStock: 0
        },
        {
            brand: "taude",
            name: "White Musk",
            category: "tote bag",
            imageUrl: ["/images/products/tote26.jpg","/images/products/tote26-1.jpg","/images/products/tote26-2.jpg"],
            description: "Simple color and modern shape",
            color: "white",
            material: "canvas",
            price: 34.50,
            countInStock: 1
        },
        {
            brand: "taude",
            name: "Break Silence",
            category: "tote bag",
            imageUrl: ["/images/products/tote22.jpg","/images/products/tote22-1.jpg"],
            description: "Simple color and modern shape",
            color: "blue",
            material: "canvas",
            price: 18.90,
            countInStock: 10
        },
        {
            brand: "taude",
            name: "Beige Dream",
            category: "tote bag",
            imageUrl: ["/images/products/tote21.jpg","/images/products/tote21-1.jpg","/images/products/tote21-2.jpg"],
            description: "Simple color and modern shape",
            color: "yellow",
            material: "canvas",
            price: 109.80,
            countInStock: 3
        },
    ],
    sellers: [
        {
            _id: 0,
            name: "Sohye Lee",
            email: "sohyelee@gmail.com",
        },
        {
            _id: 1,
            name: "Noah",
            email: "noah@gmail.com",
        },
        {
            _id: 2,
            name: "Chloe",
            email: "Chloe@gmail.com",
        },
    ],
    users: [
        {
            name: 'sohyelee',
            password: bcrypt.hashSync('8458',8),
            email: 'sohyelee@gmail.com',
            isAdmin: true,
        },
        {
            name: 'chloe',
            password: bcrypt.hashSync('8458',8),
            email: 'sohyellcofficial@gmail.com',
            isAdmin: true,
        },
        {
            name: 'jjay',
            password: bcrypt.hashSync('8458',8),
            email: 'dragonriderkim0419gmail.com',
            isAdmin: false,
        }
    ],
    orders: [
        {
            orderItems: [{
                name: 'Black Dot',
                qty: 1,
                image:  "/uploads/1609701848186.jpg",
                price: 125.9,
                product: "5ff39e5ff676bf28ade400bb"
                
            }],
            shippingAddress: {
                fullname: "Sohye",
                street: "123 Street",
                city: "Fairfax",
                stateName: "VA",
                zip: "22031",
                country: "United States",
            },
            paymentMethod: "PayPal",
            paymentResult: {
                id: "123",
                status: "Paid",
                update_time: "2021-01-04 23:01:51.973Z",
                email_address: "sohyelee@gmail.com" 
            },
            itemsPrice: 125.9,
            shippingFee: 0,
            tax: 11.33,
            total: 137.23,
            user: "5fe412bd794dc61cedb4f7ca",
            isPaid: true,
            paidAt: "2021-01-04 23:01:51.973Z",
            isDelivered: false,
            deliveredAt: null,
        }
    ],
    reviews: [
        {
            user: "5fe412bd794dc61cedb4f7ca",
            product: "5fee9530b7413a5c863cc856",
            text: "I love this bag!",
            rating: 5,
            createdAt: "2020-05-13 23:01:51.973Z"
        },
        {
            user: "5fe412bd794dc61cedb4f7ca",
            product: "5fee9530b7413a5c863cc856",
            text: "I wish it had more pockets.",
            rating: 4.5,
            createdAt: "2020-12-16 11:01:51.973Z"
        },
        {
            user: "5fe412bd794dc61cedb4f7ca",
            product: "5fee9530b7413a5c863cc856",
            text: "Great bag for office",
            rating: 4.7,
            createdAt: "2021-01-04 23:01:51.973Z"
        },
    ]
};



export default data;