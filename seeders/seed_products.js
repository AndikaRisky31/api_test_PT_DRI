import connection from "../db/connection.js";

const products = [
    { name: 'Chicken & Ribs Combo', price: 10000 },
    { name: 'Surf & Turf Gift Basket', price: 15000 },
    { name: 'Fried Chicken Dinner', price: 20000 },
    { name: 'BBQ Rib Dinner', price: 25000 },
    { name: 'Dark & Stormy', price: 25000 },
    { name: 'Shaking Beef Tri-Tip', price: 25000 },
    { name: 'Grilled Salmon Fillet', price: 30000 },
    { name: 'Vegetarian Burrito', price: 12000 },
    { name: 'Classic Cheeseburger', price: 18000 },
    { name: 'Margherita Pizza', price: 22000 }
];

export const seedProducts = async () => {
    try {
        for (const product of products) {
            await connection.query(
                'INSERT INTO products (name, price) VALUES (?, ?)',
                [product.name, product.price]
            );
        }
        console.log('Products seeded successfully.');
    } catch (error) {
        console.error('Error seeding products:', error.message);
    }
};