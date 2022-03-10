import express from 'express'
import registerRoutes from '@/routes'

const app = express()
const port = process.env.PORT || 80

registerRoutes(app)

app.listen(port, () => {
  console.log('Webserver launched')
})
