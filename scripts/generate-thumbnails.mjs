import { mkdir, readdir } from 'node:fs/promises'
import { join, parse } from 'node:path'
import sharp from 'sharp'

const source = 'public/assets'
const destination = 'public/previews'
await mkdir(destination, { recursive: true })

const images = (await readdir(source)).filter((file) => file.endsWith('.png'))
await Promise.all(images.map(async (file) => {
  await sharp(join(source, file))
    .resize({ width: 640, height: 850, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(join(destination, `${parse(file).name}.webp`))
}))

console.log(`Generated ${images.length} WebP previews.`)
