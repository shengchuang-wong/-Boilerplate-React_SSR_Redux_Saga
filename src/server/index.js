
import 'babel-polyfill';
import express from "express";
import renderer from "./renderer";
import createStore from '../client/helpers/createStore';
import indexHtml from '../../public/index.html';

const app = express();

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
