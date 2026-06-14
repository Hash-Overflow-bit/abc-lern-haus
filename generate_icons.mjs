import sharp from 'sharp';

async function generate() {
  await sharp('public/icon.svg')
    .resize(192, 192)
    .png()
    .toFile('public/icon-192x192.png');
    
  await sharp('public/icon.svg')
    .resize(512, 512)
    .png()
    .toFile('public/icon-512x512.png');
    
  console.log('PNG icons generated successfully.');
}

generate().catch(console.error);
