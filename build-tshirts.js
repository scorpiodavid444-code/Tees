const fs = require('fs-extra');
const path = require('path');
const matter = require('gray-matter');

const CONTENT_DIR = path.join(__dirname, 'content', 'tshirts');
const OUTPUT_FILE = path.join(__dirname, 'public', 'tshirts.json');

async function buildTshirtsJson() {
  try {
    const files = await fs.readdir(CONTENT_DIR);
    const products = [];

    for (const file of files) {
      if (!file.endsWith('.md')) continue;

      const filePath = path.join(CONTENT_DIR, file);
      const fileContent = await fs.readFile(filePath, 'utf8');
      const { data } = matter(fileContent);

      // Ensure required fields exist
      if (!data.name || !data.price || !data.image) continue;

      products.push({
  id: file.replace(".md", ""),   
  name: data.name,
  price: data.price,
  image: data.image,
  sizes: data.sizes || ["M"],    
  in_stock: data.in_stock ?? true
});

    }

    // Ensure public folder exists
    await fs.ensureDir(path.join(__dirname, 'public'));

    // Write JSON file
    await fs.writeJson(OUTPUT_FILE, products, { spaces: 2 });
    console.log(`✅ Tshirts JSON generated: ${OUTPUT_FILE}`);
  } catch (err) {
    console.error('❌ Error building tshirts.json', err);
  }
}

buildTshirtsJson();
