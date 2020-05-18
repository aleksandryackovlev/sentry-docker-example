import React from 'react'
import Error from 'next/error'
import { captureException }  from '../utils/sentry'

const MyError = ({ statusCode, hasGetInitialPropsRun, err }) => {
  if (!hasGetInitialPropsRun && err) {
    // getInitialProps is not called in case of
    // https://github.com/zeit/next.js/issues/8592. As a workaround, we pass
    // err via _app.js so it can be captured
    captureException(err)
  }

  return <Error statusCode={statusCode} />
};

MyError.getInitialProps = async ({ res, err, asPath }) => {
  const errorInitialProps = await Error.getInitialProps({ res, err });

  // Workaround for https://github.com/zeit/next.js/issues/8592, mark when
  // getInitialProps has run
  errorInitialProps.hasGetInitialPropsRun = true;

  if (res) {
    // Running on the server, the response object is available.
    //
    // Next.js will pass an err on the server if a page's `getInitialProps`
    // threw or returned a Promise that rejected

    if (res.statusCode === 404) {
      // Opinionated: do not record an exception in Sentry for 404
      return { statusCode: 404 }
    }

    if (err) {
      captureException(err);

      return errorInitialProps
    }
  } else {
    // Running on the client (browser).

    if (err) {
      captureException(err);

      return errorInitialProps
    }
  }

  // If this point is reached, getInitialProps was called without any
  // information about what the error might be. This is unexpected and may
  // indicate a bug introduced in Next.js, so record it in Sentry
  captureException(
    new Error(`_error.js getInitialProps missing data at path: ${asPath}`)
  );

  return errorInitialProps
};

export default MyError
