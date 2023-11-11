import multer from 'multer'

const storage = multer.diskStorage({
  destination: './src/uploads',
})

export const upload = multer({ storage })
