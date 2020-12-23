import bcrypt from 'bcryptjs';

const data = {
    products: [
        {
            sellerId: 0,
            brand: "taude",
            name: "Joy",
            category: "tote bag",
            imageUrl: ["/images/products/tote30.jpg","/images/products/tote30-1.jpg","/images/products/tote30-2.jpg"],
            description: "Simple color and modern shape",
            color: "pink",
            material: "canvas",
            price: 20.90,
            rating: 5,
            numReviews: 10,
            countInStock: 20
        },
        {
            sellerId: 0,
            brand: "taude",
            name: "Black Dot",
            category: "tote bag",
            imageUrl: ["/images/products/tote29.jpg","/images/products/tote29-1.jpg"],
            description: "Simple color and modern shape",
            color: "black",
            material: "leather",
            price: 45.90,
            rating: 4.5,
            numReviews: 23,
            countInStock: 20
        },
        {
            sellerId: 0,
            brand: "taude",
            name: "Cute Box",
            category: "tote bag",
            imageUrl: ["/images/products/tote27.jpg","/images/products/tote27-1.jpg","/images/products/tote27-2.jpg"],
            description: "High quality genuine leather",
            color: "white",
            material: "leather",
            price: 62.90,
            rating: 3.8,
            numReviews: 5,
            countInStock: 0
        },
        {
            sellerId: 0,
            brand: "taude",
            name: "White Musk",
            category: "tote bag",
            imageUrl: ["/images/products/tote26.jpg","/images/products/tote26-1.jpg","/images/products/tote26-2.jpg"],
            description: "Simple color and modern shape",
            color: "white",
            material: "canvas",
            price: 34.50,
            rating: 5,
            numReviews: 18,
            countInStock: 1
        },
        {
            sellerId: 2,
            brand: "taude",
            name: "Break Silence",
            category: "tote bag",
            imageUrl: ["/images/products/tote22.jpg","/images/products/tote22-1.jpg"],
            description: "Simple color and modern shape",
            color: "blue",
            material: "canvas",
            price: 18.90,
            rating: 5,
            numReviews: 45,
            countInStock: 10
        },
        {
            sellerId: 2,
            brand: "taude",
            name: "Beige Dream",
            category: "tote bag",
            imageUrl: ["/images/products/tote21.jpg","/images/products/tote21-1.jpg","/images/products/tote21-2.jpg"],
            description: "Simple color and modern shape",
            color: "yellow",
            material: "canvas",
            price: 109.80,
            rating: 4.9,
            numReviews: 33,
            countInStock: 3
        },
    ],
    sellers: [
        {
            _id: 0,
            name: "B_Bags",
            email: "bbags@gmail.com"
        },
        {
            _id: 1,
            name: "J.J.",
            email: "jjbags@gmail.com"
        },
        {
            _id: 2,
            name: "K. Patty",
            email: "kpatty@gmail.com"
        },
    ],
    users: [
        {
            username: 'sohyelee',
            password: bcrypt.hashSync('8458',8),
            email: 'sohyelee@gmail.com',
            firstname: 'So Hye',
            lastname: 'Lee',
            isAdmin: true,
            isSeller: false,    
        },
        {
            username: 'chloe',
            password: bcrypt.hashSync('8458',8),
            email: 'sohyellcofficial@gmail.com',
            isAdmin: false,
            isSeller: true,
        },
        {
            username: 'jjay',
            password: bcrypt.hashSync('8458',8),
            email: 'dragonriderkim0419gmail.com',
            isAdmin: false,
            isSeller: true,
        }
    ]
};

export default data;