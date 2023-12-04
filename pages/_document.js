import React from 'react'
/*
In production the stylesheet is compiled to .next/static/style.css.
The file will be served from /_next/static/style.css
You could include it into the page using either next/head or a custom _document.js.
*/
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  setGoogleTagManager() {

    return {
      __html: `
      (function (w, d, s, l, i) {
        w[l] = w[l] || []; w[l].push({
          'gtm.start':
        new Date().getTime(),
          event: 'gtm.js'
        }); var f = d.getElementsByTagName(s)[0]
        var j = d.createElement(s); var dl = l !== 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
        'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f)
      })(window, document, 'script', 'dataLayer', '${process.env.GTM_ID}')
      `
    }
  }

  render() {
    return (
      <Html lang="pt-br">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#8c43ff" />
          <meta
            name="description"
            content="Lista de Comunidades Tech Brasileiras"
          />
          <link
            rel="shortcut icon"
            type="image/png"
            href="/static/favicon.ico"
          />
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="/static/favicon/apple-icon-57x57.png?v1"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="/static/favicon/apple-icon-60x60.png?v1"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/static/favicon/apple-icon-72x72.png?v1"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/static/favicon/apple-icon-76x76.png?v1"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/static/favicon/apple-icon-114x114.png?v1"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/static/favicon/apple-icon-120x120.png?v1"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/static/favicon/apple-icon-144x144.png?v1"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/static/favicon/apple-icon-152x152.png?v1"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/favicon/apple-icon-180x180.png?v1"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/static/favicon/android-icon-192x192.png?v1"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicon/favicon-32x32.png?v1"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/static/favicon/favicon-96x96.png?v1"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicon/favicon-16x16.png?v1"
          />
          <meta
            property="og:image"
            content="/static/seo-ctech.jpg?v1"
          />
          <meta
            property="og:image:type"
            content="image/jpeg"
          />
          <meta
            property="og:image:height"
            content="600"
          />
          <meta
            property="og:image:width"
            content="1200"
          />
          <meta
            name="msapplication-TileColor"
            content="#ffffff"
          />
          <meta
            name="msapplication-TileImage"
            content="/static/favicon/ms-icon-144x144.png?v1"
          />
          <meta
            name="theme-color"
            content="#ffffff"
          />
          <link
            rel="manifest"
            href="/static/manifest.json"
          />
          <script
            src="/static/sw-register.js"
          ></script>
          {process.env.IS_PRODUCTION === 'true' && (
            <script dangerouslySetInnerHTML={this.setGoogleTagManager()} />
          )}
          <script
            src="https://kit.fontawesome.com/e258bd240c.js"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />

          {process.env.IS_PRODUCTION === 'true' && (
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${process.env.GTM_ID}`}
                height="0"
                width="0"
              ></iframe>
            </noscript>
          )}
        </body>
      </Html>
    )
  }
}
