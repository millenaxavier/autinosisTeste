import Link from 'next/link'
import React from 'react'

const TestPage = () => {
  return (
    <section className="bg-zinc-100 h-screen p-20 flex flex-col items-center justify-center">
      <h1 className="text-4xl bg-gradient-to-r from-blue-600 to-blue-500 text-transparent bg-clip-text font-extrabold h-16">Para quem é esse teste?</h1>
      <div className='my-8 justify-center w-full max-w-[500px]'>
        <Link className='ui_btn block text-center' href='/test/child'>Uma criança</Link>
        <Link className='ui_btn block text-center' href='/test/adolescent'>Um adolescente</Link>
        <Link className='ui_btn block text-center' href='/test/adult'>Um adulto</Link>
      </div>
    </section>
  )
}

export default TestPage