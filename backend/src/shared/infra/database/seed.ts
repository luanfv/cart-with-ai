import { randomUUID } from 'node:crypto';
import { AppDataSource } from './data-source';

async function seedDatabase() {
  await AppDataSource.initialize();
  const queryRunner = AppDataSource.createQueryRunner();

  try {
    console.log('Seeding database...');

    // Seed Stores
    const storesData = [
      { id: randomUUID(), name: 'Supermercado Central' },
      { id: randomUUID(), name: 'Mercado Econômico' },
      { id: randomUUID(), name: 'SuperShop Express' },
    ];

    for (const storeData of storesData) {
      const existingStore = await queryRunner.query(
        `SELECT id FROM stores WHERE name = $1`,
        [storeData.name],
      );

      if (existingStore.length === 0) {
        await queryRunner.query(
          `INSERT INTO stores (id, name) VALUES ($1, $2)`,
          [storeData.id, storeData.name],
        );
        console.log(`Store "${storeData.name}" added.`);
      } else {
        // Se já existe, pega o id existente para usar nos produtos
        storeData.id = existingStore[0].id;
        console.log(`Store "${storeData.name}" already exists.`);
      }
    }

    // Seed Products
    const productsData = [
      {
        name: 'Feijão preto - 1kg',
        price: 799,
        storeName: 'Supermercado Central',
      },
      {
        name: 'Arroz branco - 1kg',
        price: 599,
        storeName: 'Supermercado Central',
      },
      {
        name: 'Farinha de mandioca - 500g',
        price: 425,
        storeName: 'Supermercado Central',
      },
      {
        name: 'Linguiça calabresa - 500g',
        price: 1190,
        storeName: 'Supermercado Central',
      },
      {
        name: 'Costelinha suína - 1kg',
        price: 1890,
        storeName: 'Supermercado Central',
      },
      {
        name: 'Macarrão espaguete - 500g',
        price: 399,
        storeName: 'Supermercado Central',
      },
      {
        name: 'Peito de frango - 1kg',
        price: 1290,
        storeName: 'Supermercado Central',
      },
      {
        name: 'Creme de leite - 200g',
        price: 299,
        storeName: 'Supermercado Central',
      },
      {
        name: 'Queijo mussarela - 200g',
        price: 690,
        storeName: 'Supermercado Central',
      },
      { name: 'Cenoura - 1kg', price: 449, storeName: 'Supermercado Central' },
      { name: 'Ovos - dúzia', price: 999, storeName: 'Supermercado Central' },
      {
        name: 'Açúcar refinado - 1kg',
        price: 549,
        storeName: 'Supermercado Central',
      },
      {
        name: 'Chocolate em pó - 200g',
        price: 679,
        storeName: 'Supermercado Central',
      },
      {
        name: 'Fermento químico - 100g',
        price: 299,
        storeName: 'Supermercado Central',
      },
      {
        name: 'Óleo de soja - 900ml',
        price: 649,
        storeName: 'Supermercado Central',
      },

      {
        name: 'Feijão preto - 1kg',
        price: 749,
        storeName: 'Mercado Econômico',
      },
      {
        name: 'Arroz branco - 1kg',
        price: 579,
        storeName: 'Mercado Econômico',
      },
      {
        name: 'Linguiça calabresa - 500g',
        price: 1090,
        storeName: 'Mercado Econômico',
      },
      {
        name: 'Costelinha suína - 1kg',
        price: 1790,
        storeName: 'Mercado Econômico',
      },
      {
        name: 'Macarrão espaguete - 500g',
        price: 419,
        storeName: 'Mercado Econômico',
      },
      {
        name: 'Peito de frango - 1kg',
        price: 1240,
        storeName: 'Mercado Econômico',
      },
      {
        name: 'Creme de leite - 200g',
        price: 289,
        storeName: 'Mercado Econômico',
      },
      { name: 'Cenoura - 1kg', price: 429, storeName: 'Mercado Econômico' },
      { name: 'Ovos - dúzia', price: 959, storeName: 'Mercado Econômico' },
      {
        name: 'Chocolate em pó - 200g',
        price: 659,
        storeName: 'Mercado Econômico',
      },
      {
        name: 'Fermento químico - 100g',
        price: 289,
        storeName: 'Mercado Econômico',
      },

      {
        name: 'Farinha de mandioca - 500g',
        price: 399,
        storeName: 'SuperShop Express',
      },
      {
        name: 'Linguiça calabresa - 500g',
        price: 1150,
        storeName: 'SuperShop Express',
      },
      {
        name: 'Peito de frango - 1kg',
        price: 1350,
        storeName: 'SuperShop Express',
      },
      {
        name: 'Creme de leite - 200g',
        price: 319,
        storeName: 'SuperShop Express',
      },
      {
        name: 'Queijo mussarela - 200g',
        price: 729,
        storeName: 'SuperShop Express',
      },
      { name: 'Cenoura - 1kg', price: 469, storeName: 'SuperShop Express' },
      { name: 'Ovos - dúzia', price: 1020, storeName: 'SuperShop Express' },
      {
        name: 'Açúcar refinado - 1kg',
        price: 569,
        storeName: 'SuperShop Express',
      },
      {
        name: 'Chocolate em pó - 200g',
        price: 699,
        storeName: 'SuperShop Express',
      },
      {
        name: 'Fermento químico - 100g',
        price: 319,
        storeName: 'SuperShop Express',
      },
    ];

    for (const productData of productsData) {
      // Busca o id da store pelo nome
      const store = storesData.find((s) => s.name === productData.storeName);
      if (!store) continue;

      const existingProduct = await queryRunner.query(
        `SELECT id FROM products WHERE name = $1 AND store_id = $2`,
        [productData.name, store.id],
      );

      if (existingProduct.length === 0) {
        await queryRunner.query(
          `INSERT INTO products (id, name, price, store_id, embedding) VALUES ($1, $2, $3, $4, NULL)`,
          [randomUUID(), productData.name, productData.price, store.id],
        );
        console.log(`Product "${productData.name}" added.`);
      } else {
        console.log(`Product "${productData.name}" already exists.`);
      }
    }

    // Seed Users
    const usersData = [
      {
        id: randomUUID(),
        name: 'John Doe',
        email: 'johndoe@email.com',
        password: 'dummyhash',
      },
    ];

    for (const userData of usersData) {
      const existingUser = await queryRunner.query(
        `SELECT id FROM users WHERE email = $1`,
        [userData.email],
      );

      if (existingUser.length === 0) {
        await queryRunner.query(
          `INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4)`,
          [userData.id, userData.name, userData.email, userData.password],
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
