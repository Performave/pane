import { Express } from 'express'

const registerRoutes = (app: Express) => {
  app.get('/', (req, res) => {
    res.send('Hello World!')
  })
}

export default registerRoutes