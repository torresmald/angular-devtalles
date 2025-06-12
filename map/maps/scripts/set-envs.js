import { writeFileSync, mkdirSync } from 'fs'

import dotenv from 'dotenv'

dotenv.config()

const targetPath = './src/environments/environment.ts'
const targetGit = './src/environments/.gitkeep'
const targetPathDev = './src/environments/environment.development.ts'

const mapboxKey = process.env['MAPBOX_KEY']

if (!mapboxKey) {
  throw new Error('Mapbox key not found')
}

const envFileContent = `
export const environment = {
  mapboxKey: "${mapboxKey}"
};
`
const gitKeep = ``

mkdirSync('./src/environments', {recursive: true})

writeFileSync(targetPath, envFileContent)
writeFileSync(targetGit, gitKeep)
writeFileSync(targetPathDev, envFileContent)
