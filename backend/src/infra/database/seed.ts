import { AppDataSource } from './data-source';

async function seedDatabase() {
  await AppDataSource.initialize();
  const queryRunner = AppDataSource.createQueryRunner();

  try {
    await queryRunner.query(`
      INSERT INTO stores (name) VALUES
        ('Supermercado Central'),
        ('Mercado Econômico'),
        ('SuperShop Express');
    `);

    await queryRunner.query(`
      INSERT INTO products (name, price, store_id, embedding) VALUES
        -- Supermercado Central (Loja 1)
        ('Feijão preto - 1kg', 799, 1, NULL),
        ('Arroz branco - 1kg', 599, 1, NULL),
        ('Farinha de mandioca - 500g', 425, 1, NULL),
        ('Linguiça calabresa - 500g', 1190, 1, NULL),
        ('Costelinha suína - 1kg', 1890, 1, NULL),
        ('Macarrão espaguete - 500g', 399, 1, NULL),
        ('Peito de frango - 1kg', 1290, 1, NULL),
        ('Creme de leite - 200g', 299, 1, NULL),
        ('Queijo mussarela - 200g', 690, 1, NULL),
        ('Cenoura - 1kg', 449, 1, NULL),
        ('Ovos - dúzia', 999, 1, NULL),
        ('Açúcar refinado - 1kg', 549, 1, NULL),
        ('Chocolate em pó - 200g', 679, 1, NULL),
        ('Fermento químico - 100g', 299, 1, NULL),
        ('Óleo de soja - 900ml', 649, 1, NULL),

        -- Mercado Econômico (Loja 2)
        ('Feijão preto - 1kg', 749, 2, NULL),
        ('Arroz branco - 1kg', 579, 2, NULL),
        ('Linguiça calabresa - 500g', 1090, 2, NULL),
        ('Costelinha suína - 1kg', 1790, 2, NULL),
        ('Macarrão espaguete - 500g', 419, 2, NULL),
        ('Peito de frango - 1kg', 1240, 2, NULL),
        ('Creme de leite - 200g', 289, 2, NULL),
        ('Cenoura - 1kg', 429, 2, NULL),
        ('Ovos - dúzia', 959, 2, NULL),
        ('Chocolate em pó - 200g', 659, 2, NULL),
        ('Fermento químico - 100g', 289, 2, NULL),

        -- SuperShop Express (Loja 3)
        ('Farinha de mandioca - 500g', 399, 3, NULL),
        ('Linguiça calabresa - 500g', 1150, 3, NULL),
        ('Peito de frango - 1kg', 1350, 3, NULL),
        ('Creme de leite - 200g', 319, 3, NULL),
        ('Queijo mussarela - 200g', 729, 3, NULL),
        ('Cenoura - 1kg', 469, 3, NULL),
        ('Ovos - dúzia', 1020, 3, NULL),
        ('Açúcar refinado - 1kg', 569, 3, NULL),
        ('Chocolate em pó - 200g', 699, 3, NULL),
        ('Fermento químico - 100g', 319, 3, NULL);
    `);

    await queryRunner.query(`
      INSERT INTO users (name, email, password) VALUES
        ('John Doe', 'johndoe@email.com', 'dummyhash');  
    `);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await queryRunner.release();
    await AppDataSource.destroy();
  }
}

seedDatabase();
