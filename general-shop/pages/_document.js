import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';


class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" >
        <Head>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossOrigin="anonymous" />
          <title>General Shop</title>
          <meta name="description" content="Camisetas Basicas con sentido Práctico" />
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="" />
        </Head>
        <body>
          <div id='root'></div>
          <Main/>
           <NextScript />
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossOrigin="anonymous"></script>
        </body> 
      </Html>
    );
  }
}


export default MyDocument;
