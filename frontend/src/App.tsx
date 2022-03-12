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
        <h1 className='text-4xl md:text-7xl font-semibold'>
          <a
            href='https://performave.com'
            target='_blank'
            rel='noreferrer'
          >
            PERFORMAVE
          </a>
        </h1>
        <p><a href='https://www.github.com/ericwang401/pane' className='text-blue-500' target='_blank' rel='noreferrer'>Source Code</a> | Please donate if you like this: <a className='text-blue-500' href='https://www.patreon.com/performave' target='_blank' rel='noreferrer'>Patreon</a></p>
      </div>
    </>
  )
}

export default App
