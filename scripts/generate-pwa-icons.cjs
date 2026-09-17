// Generate PWA icons from the official Grace Production logo.
// Logo is 1600x800 (2:1 landscape): top = G emblem, bottom = text/contact.
// We extract the top-center square (the G emblem) and produce all standard
// PWA icon sizes + maskable (with safe padding) + apple-touch-icon.

const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

const SRC = path.join(__dirname, '..', 'public', 'images', 'logo.jpeg')
const OUT_DIR = path.join(__dirname, '..', 'public', 'icons')

async function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true })

  const meta = await sharp(SRC).metadata()
  console.log('Source logo:', meta.width + 'x' + meta.height)

  // 1. Extract the top-center square (the G emblem region).
  const W = meta.width
  const H = meta.height
  const sqSize = Math.min(W, H) // 800
  const left = Math.floor((W - sqSize) / 2)
  const top = 0
  const gEmblem = sharp(SRC).extract({ left, top, width: sqSize, height: sqSize })

  // Standard sizes (PNG)
  const sizes = [192, 256, 384, 512]
  for (const size of sizes) {
    const dest = path.join(OUT_DIR, `icon-${size}.png`)
    await gEmblem.clone().resize(size, size, { fit: 'cover' }).png().toFile(dest)
    console.log('  ✓', path.basename(dest))
  }

  // Apple touch icon (180x180, no transparency — Apple adds rounded corners)
  const appleDest = path.join(OUT_DIR, 'apple-touch-icon.png')
  await gEmblem
    .clone()
    .resize(180, 180, { fit: 'cover' })
    .flatten({ background: '#ffffff' })
    .png()
    .toFile(appleDest)
  console.log('  ✓ apple-touch-icon.png')

  // Maskable icons (with 10% safe padding around the G so Android can crop to any shape)
  for (const size of [192, 512]) {
    const dest = path.join(OUT_DIR, `maskable-${size}.png`)
    const inner = Math.floor(size * 0.8)
    const offset = Math.floor((size - inner) / 2)
    const gResized = await gEmblem
      .clone()
      .resize(inner, inner, { fit: 'cover' })
      .flatten({ background: '#0d0d0d' })
      .png()
      .toBuffer()
    await sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: { r: 13, g: 13, b: 13, alpha: 1 },
      },
    })
      .composite([{ input: gResized, top: offset, left: offset }])
      .png()
      .toFile(dest)
    console.log('  ✓', path.basename(dest))
  }

  // Favicon (32x32 + 16x16)
  for (const size of [16, 32]) {
    const dest = path.join(OUT_DIR, `favicon-${size}.png`)
    await gEmblem.clone().resize(size, size, { fit: 'cover' }).png().toFile(dest)
    console.log('  ✓', path.basename(dest))
  }

  // OG image (1200x630 — social sharing). Use the full landscape logo on dark background.
  const ogDest = path.join(OUT_DIR, 'og-image.png')
  const W2 = 1200
  const H2 = 630
  const logoW = Math.floor(W2 * 0.6) // 720
  const logoH = Math.floor(logoW * (H / W)) // 360
  const logoX = Math.floor((W2 - logoW) / 2)
  const logoY = Math.floor((H2 - logoH) / 2)
  const logoResized = await sharp(SRC)
    .resize(logoW, logoH, { fit: 'cover' })
    .png()
    .toBuffer()
  await sharp({
    create: {
      width: W2,
      height: H2,
      channels: 4,
      background: { r: 13, g: 13, b: 13, alpha: 1 },
    },
  })
    .composite([
      {
        input: logoResized,
        top: logoY,
        left: logoX,
      },
    ])
    .png()
    .toFile(ogDest)
  console.log('  ✓ og-image.png')

  console.log('\n✅ All PWA icons generated in', path.relative(process.cwd(), OUT_DIR))
  const files = fs.readdirSync(OUT_DIR)
  files.forEach((f) => {
    const s = fs.statSync(path.join(OUT_DIR, f))
    console.log('   ' + f + ' (' + Math.round(s.size / 1024) + 'KB)')
  })
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
