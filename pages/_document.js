// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Charset */}
          <meta charSet="utf-8" />
          {/* JSON-LD Person schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Person',
                name: 'Tokoni Orukaria',
                url: 'https://tkayverse.vercel.app',
                sameAs: [
                  'https://github.com/Tkay6677',
                  'https://twitter.com/tkayverse',
                ],
              }),
            }}
          />
          
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}