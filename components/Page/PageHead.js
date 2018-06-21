import Head from 'next/head';

export default class PageHead extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Head>
        <meta charSet="utf-8" />
        <title>
          TeamsID
        </title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta content="Webflow" name="generator" />
        <link
          href="/static/css/main.css"
          rel="stylesheet"
          type="text/css"
        />
      </Head>
    );
  }
}
