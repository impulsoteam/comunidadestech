import React from 'react'
import cookies from 'next-cookies'
import LoginComponent from '/components/LoginComponent/'

const Login = () => <LoginComponent />

Login.getInitialProps = async (ctx) => {
  const credentials = cookies(ctx).ctech_credentials || {}
  if (credentials.token) {
    ctx.res.writeHead(302, {
      Location: '/'
    })
    ctx.res.end()
  }
}

export default Login
