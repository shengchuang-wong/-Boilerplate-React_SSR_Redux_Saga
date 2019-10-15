
import 'babel-polyfill';
import express from "express";
import renderer from "./renderer";
import createStore from '../client/helpers/createStore';
import indexHtml from '../../public/index.html';

const app = express();
import Cookies from 'universal-cookie';

app.get("/cookies", (req, res) => {
  const cookies = new Cookies(req.headers.cookie);
  const allCookies = cookies.getAll()
  console.log('all cookies', allCookies)
  res.status(200).end(JSON.stringify(allCookies))
})

app.use(express.static("public"));
app.get("*", function (req, res) {
  const store = createStore(req);
  const context = {};
  const data = indexHtml
  renderer(data, req.path, context, store, res)
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
