/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import View from '@ioc:Adonis/Core/View'

Route.get('/', async () => {
  return await View.render('home', {
    name: process.env.NAME || 'Lookup',
    ipv4: process.env.IP_V4 || "No IPV4 Set",
    ipv6: process.env.IP_V6 || "No IPV6 Set",
    location: process.env.LOCATION || "No Location Set"
  })
})

Route.get('/info/name', async () => {
  return process.env.NAME || ''
})

Route.get('/info/network', 'NetworkController.index')

Route.post('/run/ping', 'NetworkController.ping')
Route.post('/run/traceroute', 'NetworkController.traceroute')
Route.get('/benchmark', 'NetworkController.speedtest')
Route.get('/benchmark/latency', async () => {
  return 'pong!'
})