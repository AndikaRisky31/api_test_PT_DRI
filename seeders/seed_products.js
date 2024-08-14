import { connection } from '../db.js';

const seedProducts = async () => {
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

    const insertProductQuery = `
        INSERT INTO product (name, price)
        VALUES ?
    `;

    const values = products.map(product => [product.name, product.price]);

    try {
        await connection.query(insertProductQuery, [values]);
        console.log('Products seeded successfully.');
    } catch (error) {
        console.error('Error seeding products:', error);
    } finally {
        await connection.end();
    }
};

seedProducts();
