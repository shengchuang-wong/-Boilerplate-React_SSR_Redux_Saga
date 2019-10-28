import 'babel-polyfill'
import express from 'express'
import renderer from './renderer'
import createStore from '../client/helpers/createStore'
import Cookies from 'universal-cookie'

const app = express()

app.get('/cookies', (req, res) => {
  const cookies = new Cookies(req.headers.cookie)
  const allCookies = cookies.getAll()
  res.status(200).end(JSON.stringify(allCookies))
})

app.use(express.static('public'))

// custom middleware to get cookie
app.use((req, res, next) => {
  const cookies = new Cookies(req.headers.cookie)
  req.universalCookies = cookies
  next()
})

// universal route handling
app.get('*', function(req, res) {
  const store = createStore(req)
  const context = {}

  renderer(req.path, context, store, req, res)
})

export default app
