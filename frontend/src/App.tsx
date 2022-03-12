import React, { useEffect } from 'react'
import ServerInfo from '@/components/ServerInfo'
import NetworkTests from '@/components/NetworkTests'
import Benchmarks from '@/components/Benchmarks'
import http from '@/util/http'

import { useQuery } from 'react-query'

function App() {
  const fetchName = async () => {
    return await (
      await http.get('/info/name')
    ).data
  }

  const { data } = useQuery<string, Error>('name', fetchName)

  return (
    <>
      <div className='content sm:py-6 lg:py-8'>
        <h1 className='flex items-center heading'>
          <a
            href='https://github.com/ericwang401/pane'
            target='_blank'
            rel='noreferrer'
          >
            <img src='logo.png' alt='Pane logo' className='h-10' />
          </a>
          <span className='ml-5'>{data}</span>
        </h1>
      </div>

      <ServerInfo />

      <NetworkTests />

      <Benchmarks />

      <div className='content'>
        <p>Tool created by</p>
        <h1 className='text-4xl md:text-7xl font-semibold'>PERFORMAVE</h1>
      </div>
    </>
  )
}

export default App
