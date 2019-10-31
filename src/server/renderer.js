import React from 'react'
import Layout from '../common/Layout'
import { StaticRouter } from 'react-router-dom'
import Helmet from 'react-helmet'
import getData from '../common/routes'
import { Provider } from 'react-redux'
import serialize from 'serialize-javascript'
import rootSaga from '../client/sagas'
import { CookiesProvider } from 'react-cookie'
import { renderToString } from 'react-dom/server'
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server'
import { resolve } from 'path'
import ErrorBoundary from 'client/components/common/ErrorBoundary/ErrorBoundary'

export default async function renderer(path, context, store, req, res) {
  try {
    const statsFile = resolve('./public/loadable-stats.json')
    const extractor = new ChunkExtractor({
      statsFile
    })

    store.sagaMiddleware
      .run(rootSaga)
      .toPromise()
      .then(() => {
        const serverHtml = renderToString(
          <ChunkExtractorManager extractor={extractor}>
            <CookiesProvider cookies={req.universalCookies}>
              <Provider store={store}>
                <ErrorBoundary>
                  <StaticRouter location={path} context={context}>
                    <Layout />
                  </StaticRouter>
                </ErrorBoundary>
              </Provider>
            </CookiesProvider>
          </ChunkExtractorManager>
        )

        let htmlTemplate = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <link href='https://fonts.googleapis.com/css?family=Product+Sans:300,400,500,700,300i,400i,500i,700i' rel='stylesheet' type='text/css' lazyload/>
          ${extractor.getStyleTags()}
        </head>
        <body>
          <div id="root">${serverHtml}</div>
          <script>window.INITIAL_STATE=${serialize(store.getState())}</script>
          ${extractor.getScriptTags()}
        </body>
        </html>
        `
        const helmet = Helmet.renderStatic()
        const head = helmet.title.toString() + helmet.meta.toString()
        const index = htmlTemplate.indexOf('</head>')
        const html1 = htmlTemplate.slice(0, index)
        const html2 = htmlTemplate.slice(index)

        if (context.notFound) {
          res.status(404)
        }
        res.send(html1 + head + html2)
      })
    getData(path, store)
    store.close()
  } catch (err) {
    console.log('error occured', err)
  }
}
