import Head from 'next/head'
import CardGenerator from '../components/CardGenerator'

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>AI祝福贺卡图片 - AI Best Wishes Cards</title>
        <meta name="description" content="Generate AI-powered greeting cards" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen py-16">
        <h1 className="text-4xl font-bold text-center mb-8">
          AI祝福贺卡图片
          <br />
          <span className="text-2xl font-normal">AI Best Wishes Cards</span>
        </h1>
        <CardGenerator />
      </main>

      <footer className="text-center py-8">
        <p>© 2023 AI Greeting Card Generator</p>
      </footer>
    </div>
  )
}