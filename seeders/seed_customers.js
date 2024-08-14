import { connection } from '../db.js';

const seedCustomers = async () => {
  const customers = [
    { name: 'John Doe', level: 'warga', favorite_menu: 'Margherita Pizza' },
    { name: 'Jane Smith', level: 'juragan', favorite_menu: 'Classic Cheeseburger' },
    { name: 'Alice Johnson', level: 'sultan', favorite_menu: 'Grilled Salmon Fillet' },
    { name: 'Bob Brown', level: 'konglomerat', favorite_menu: 'Shaking Beef Tri-Tip' },
    { name: 'Charlie Davis', level: 'warga', favorite_menu: 'Vegetarian Burrito' },
    { name: 'Emily Evans', level: 'juragan', favorite_menu: 'BBQ Rib Dinner' },
    { name: 'Frank Harris', level: 'sultan', favorite_menu: 'Fried Chicken Dinner' },
    { name: 'Grace King', level: 'konglomerat', favorite_menu: 'Surf & Turf Gift Basket' },
    { name: 'Henry Lewis', level: 'warga', favorite_menu: 'Chicken & Ribs Combo' },
    { name: 'Ivy Miller', level: 'juragan', favorite_menu: 'Dark & Stormy' },
  ];

  const insertCustomerQuery = `
    INSERT INTO customer (name, level, favorite_menu)
    VALUES ?
  `;

  const values = customers.map(customer => [customer.name, customer.level, customer.favorite_menu]);

  try {
    await connection.query(insertCustomerQuery, [values]);
    console.log('Customers seeded successfully.');
  } catch (error) {
    console.error('Error seeding customers:', error);
  } finally {
    await connection.end();
  }
};

seedCustomers();
