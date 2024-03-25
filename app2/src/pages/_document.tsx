import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";
import React from "react";
import { revalidate } from "@module-federation/nextjs-mf/utils";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    await revalidate();

    const initialProps = await Document.getInitialProps(ctx);
  
    return {
      ...initialProps,
    };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>

        <body className="bg-background-grey">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
