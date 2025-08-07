import { randomUUID } from 'node:crypto';
import { AppDataSource } from './data-source';

async function seedDatabase() {
  await AppDataSource.initialize();
  const queryRunner = AppDataSource.createQueryRunner();

  try {
    console.log('Seeding database...');

    // Seed Stores
    const storesData = [
      { name: 'Supermercado Central' },
      { name: 'Mercado Econômico' },
      { name: 'SuperShop Express' },
    ];

    for (const storeData of storesData) {
      const existingStore = await queryRunner.query(
        `SELECT id FROM stores WHERE name = $1`,
        [storeData.name],
      );

      if (existingStore.length === 0) {
        await queryRunner.query(`INSERT INTO stores (name) VALUES ($1)`, [
          storeData.name,
        ]);
        console.log(`Store "${storeData.name}" added.`);
      } else {
        console.log(`Store "${storeData.name}" already exists.`);
      }
    }

    // Seed Products
    const productsData = [
      { name: 'Feijão preto - 1kg', price: 799, store_id: 1 },
      { name: 'Arroz branco - 1kg', price: 599, store_id: 1 },
      { name: 'Farinha de mandioca - 500g', price: 425, store_id: 1 },
      { name: 'Linguiça calabresa - 500g', price: 1190, store_id: 1 },
      { name: 'Costelinha suína - 1kg', price: 1890, store_id: 1 },
      { name: 'Macarrão espaguete - 500g', price: 399, store_id: 1 },
      { name: 'Peito de frango - 1kg', price: 1290, store_id: 1 },
      { name: 'Creme de leite - 200g', price: 299, store_id: 1 },
      { name: 'Queijo mussarela - 200g', price: 690, store_id: 1 },
      { name: 'Cenoura - 1kg', price: 449, store_id: 1 },
      { name: 'Ovos - dúzia', price: 999, store_id: 1 },
      { name: 'Açúcar refinado - 1kg', price: 549, store_id: 1 },
      { name: 'Chocolate em pó - 200g', price: 679, store_id: 1 },
      { name: 'Fermento químico - 100g', price: 299, store_id: 1 },
      { name: 'Óleo de soja - 900ml', price: 649, store_id: 1 },
      { name: 'Feijão preto - 1kg', price: 749, store_id: 2 },
      { name: 'Arroz branco - 1kg', price: 579, store_id: 2 },
      { name: 'Linguiça calabresa - 500g', price: 1090, store_id: 2 },
      { name: 'Costelinha suína - 1kg', price: 1790, store_id: 2 },
      { name: 'Macarrão espaguete - 500g', price: 419, store_id: 2 },
      { name: 'Peito de frango - 1kg', price: 1240, store_id: 2 },
      { name: 'Creme de leite - 200g', price: 289, store_id: 2 },
      { name: 'Cenoura - 1kg', price: 429, store_id: 2 },
      { name: 'Ovos - dúzia', price: 959, store_id: 2 },
      { name: 'Chocolate em pó - 200g', price: 659, store_id: 2 },
      { name: 'Fermento químico - 100g', price: 289, store_id: 2 },
      { name: 'Farinha de mandioca - 500g', price: 399, store_id: 3 },
      { name: 'Linguiça calabresa - 500g', price: 1150, store_id: 3 },
      { name: 'Peito de frango - 1kg', price: 1350, store_id: 3 },
      { name: 'Creme de leite - 200g', price: 319, store_id: 3 },
      { name: 'Queijo mussarela - 200g', price: 729, store_id: 3 },
      { name: 'Cenoura - 1kg', price: 469, store_id: 3 },
      { name: 'Ovos - dúzia', price: 1020, store_id: 3 },
      { name: 'Açúcar refinado - 1kg', price: 569, store_id: 3 },
      { name: 'Chocolate em pó - 200g', price: 699, store_id: 3 },
      { name: 'Fermento químico - 100g', price: 319, store_id: 3 },
    ];

    for (const productData of productsData) {
      const existingProduct = await queryRunner.query(
        `SELECT id FROM products WHERE name = $1 AND store_id = $2`,
        [productData.name, productData.store_id],
      );

      if (existingProduct.length === 0) {
        await queryRunner.query(
          `INSERT INTO products (name, price, store_id, embedding) VALUES ($1, $2, $3, NULL)`,
          [productData.name, productData.price, productData.store_id],
        );
        console.log(`Product "${productData.name}" added.`);
      } else {
        console.log(`Product "${productData.name}" already exists.`);
      }
    }

    // Seed Users
    const usersData = [
      { name: 'John Doe', email: 'johndoe@email.com', password: 'dummyhash' },
    ];

    for (const userData of usersData) {
      const existingUser = await queryRunner.query(
        `SELECT id FROM users WHERE email = $1`,
        [userData.email],
      );

      if (existingUser.length === 0) {
        await queryRunner.query(
          `INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4)`,
          [randomUUID(), userData.name, userData.email, userData.password],
        );
        console.log(`User "${userData.email}" added.`);
      } else {
        console.log(`User "${userData.email}" already exists.`);
      }
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await queryRunner.release();
    await AppDataSource.destroy();
  }
}

seedDatabase();
