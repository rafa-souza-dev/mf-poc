import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";
import React from "react";
import { revalidate, FlushedChunks, flushChunks } from "@module-federation/nextjs-mf/utils";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    if(process.env.NODE_ENV === "development" && !ctx?.req?.url?.includes("_next")) {
      await revalidate().then((shouldReload) =>{
        if (shouldReload) {
          ctx?.res?.writeHead(302, { Location: ctx?.req?.url });
          ctx?.res?.end();
        }
      });
    } else {
      ctx?.res?.on("finish", () => {
        revalidate()
      });
    }
    const initialProps = await Document.getInitialProps(ctx);
    const chunks = await flushChunks()

    return {
      ...initialProps,
      chunks
    };

  }

  render() {
    const chunks = this.props.__NEXT_DATA__.props.chunks || [];

    return (
      <Html>
        <Head>
          <meta name="robots" content="noindex" />
          <FlushedChunks chunks={chunks} />
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
