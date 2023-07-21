import { Html, Head, Main, NextScript } from 'next/document'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className='custom-bg-section'>
        <Navbar />
        <Main />
        <Footer />
        <NextScript />
      </body>
    </Html>
  )
}
