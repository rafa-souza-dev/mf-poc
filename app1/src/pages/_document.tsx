import { revalidate } from '@module-federation/nextjs-mf/utils';
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    if (ctx?.pathname && !ctx?.pathname?.endsWith('_error')) {
      await revalidate().then((shouldUpdate) => {
        if (shouldUpdate) {
          console.log('Hot Module Replacement (HMR) activated', shouldUpdate);
        }
      });
    }

    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
