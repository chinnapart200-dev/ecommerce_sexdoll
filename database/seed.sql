USE ecommerce_sexdoll;

INSERT INTO categories (slug, name, image_url) VALUES
  ('women', 'Women', '/images/categories/women.jpg'),
  ('men', 'Men', '/images/categories/men.jpg'),
  ('kids', 'Kids', '/images/categories/kids.jpg'),
  ('accessories', 'Accessories', '/images/categories/accessories.jpg')
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  image_url = VALUES(image_url);

INSERT INTO products (
  category_id,
  slug,
  name,
  description,
  price,
  sale_price,
  image_url,
  is_featured,
  is_new,
  stock
) VALUES
  (1, 'embroidered-cotton-blouse', 'Embroidered Cotton Blouse', 'Lightweight cotton blouse with a premium embroidered finish.', 99.00, NULL, '/images/products/product-1.jpg', 1, 1, 24),
  (1, 'floral-print-shirt', 'Floral Print Shirt', 'Statement shirt with a bold floral print and relaxed fit.', 120.00, 149.00, '/images/products/product-2.jpg', 1, 0, 18),
  (2, 'classic-cotton-tank', 'Classic Cotton Tank', 'Minimal cotton tank designed for everyday layering.', 39.00, NULL, '/images/products/product-3.jpg', 1, 1, 40),
  (2, 'utility-oversized-jacket', 'Utility Oversized Jacket', 'Oversized jacket built for modern streetwear styling.', 159.00, 199.00, '/images/products/product-4.jpg', 1, 0, 12),
  (3, 'linen-button-shirt', 'Linen Button Shirt', 'Breathable linen shirt with a clean tailored silhouette.', 69.00, NULL, '/images/products/product-5.jpg', 0, 1, 30);

