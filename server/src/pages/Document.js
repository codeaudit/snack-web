/* @flow */

import React from 'react';
import GoogleAnalytics from '../components/GoogleAnalytics';
import Segment from '../components/SegmentDocumentComponent';
import resources from '../../../resources.json';
import jsesc from 'jsesc';

type Props = {
  id: ?string,
  splitTestSettings: Object,
  data:
    | {
        type: 'success',
        snack: ?Object,
      }
    | {
        type: 'error',
        error: { message: string },
      },
};

const css: any = String.raw;

const DEFAULT_DESCRIPTION = 'No description';
const DEFAULT_METADATA_NAME = 'Snack - React Native in the browser';
const DEFAULT_METADATA_DESCRIPTION_EMPTY = `Write code in Expo's online editor and instantly use it on your phone.`;
const DEFAULT_METADATA_DESCRIPTION_SAVED = `Try this project on your phone! Use Expo's online editor to make changes and save your own copy.`;

export default class Document extends React.Component<Props> {
  render() {
    const { id, data, splitTestSettings } = this.props;
    const title =
      data.type === 'success' && data.snack && data.snack.manifest.name
        ? data.snack.manifest.name
        : DEFAULT_METADATA_NAME;
    const description =
      data.type === 'success' && data.snack
        ? data.snack.manifest.description && data.snack.manifest.description !== DEFAULT_DESCRIPTION
          ? data.snack.manifest.description
          : DEFAULT_METADATA_DESCRIPTION_EMPTY
        : DEFAULT_METADATA_DESCRIPTION_SAVED;
    const url = id ? `https://snack.expo.io/${id}` : `https://snack.expo.io`;

    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />

          <title>{title}</title>

          <meta property="og:url" content={url} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:type" content="website" />
          <meta
            property="og:image"
            content="https://s3.amazonaws.com/exp-brand-assets/ExpoIcon_200.png"
          />
          <meta property="og:image:width" content="200" />
          <meta property="og:image:height" content="200" />

          <link rel="shortcut icon" href="/favicon.ico" />

          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,300,500,600"
          />
          <link rel="stylesheet" href={resources.normalize} />

          <style
            type="text/css"
            dangerouslySetInnerHTML={{
              __html: css`
                html {
                  box-sizing: border-box;
                }

                *,
                *:before,
                *:after {
                  box-sizing: inherit;
                }

                html,
                body {
                  height: 100%;
                  width: 100%;
                }

                body {
                  font-family: 'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;
                  font-size: 14px;
                  line-height: 1.42857143;
                  overscroll-behavior: none;
                }

                button,
                input,
                select,
                textarea {
                  font: inherit;
                  color: inherit;
                  line-height: inherit;
                }

                button {
                  cursor: pointer;
                }

                button[disabled] {
                  cursor: default;
                }

                #root {
                  height: 100vh;
                }
              `,
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
               window.__INITIAL_DATA__ = ${jsesc(
                 {
                   data,
                   splitTestSettings,
                 },
                 {
                   quotes: 'double',
                   isScriptContext: true,
                 }
               )} `,
            }}
          />
        </head>

        <body>
          <div id="root" />
          <Segment splitTestSettings={splitTestSettings} />
          <GoogleAnalytics propertyId="UA-53647600-5" />
          <script src={resources['babel-polyfill']} />
          <script src="/dist/app.bundle.js" />
        </body>
      </html>
    );
  }
}
