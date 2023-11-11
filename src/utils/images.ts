import fs from 'fs'
import path from 'path'

export function renameImage(imageName: string, userId: string, files: any) {
  const image = files[imageName][0]
  const { path: oldPath } = image
  const newPath = path.join(
    path.dirname(oldPath),
    imageName + '-' + userId + path.extname(image.originalname)
  )

  fs.rename(oldPath, newPath, (err) => {
    if (err) throw err
  })
}
