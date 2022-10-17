import Benchmarks from '@components/Benchmarks'
import NetworkTests from '@components/NetworkTests'
import ServerInfo from '@components/ServerInfo'
import type { GetServerSidePropsContext, NextPage } from 'next'

interface Props {
  data: {
    name: string
    location: string
    ipv4: string
    ipv6: string
    clientIp: string
  }
}

export async function getServerSideProps({
  req,
}: GetServerSidePropsContext): Promise<{ props: Props }> {
  return {
    props: {
      data: {
        name: process.env.NAME || '',
        location: process.env.LOCATION || 'Unavailable',
        ipv4: process.env.IP_V4 || 'Unavailable',
        ipv6: process.env.IP_V6 || 'Unavailable',

        // @see https://www.kindacode.com/snippet/next-js-how-to-get-users-ip-address/
        clientIp: req.socket.remoteAddress || 'Unavailable',
      },
    },
  }
}

const Home: NextPage<Props> = ({ data }) => {
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
          <span className='ml-5'>{data.name}</span>
        </h1>
      </div>

      <ServerInfo data={data} />

      <NetworkTests />

      <Benchmarks />

      <div className='content'>
        <p>Tool created by</p>
        <h1 className='text-4xl md:text-7xl font-semibold'>
          <a href='https://performave.com' target='_blank' rel='noreferrer'>
            PERFORMAVE
          </a>
        </h1>
        <p>
          <a
            href='https://www.github.com/ericwang401/pane'
            className='text-blue-500'
            target='_blank'
            rel='noreferrer'
          >
            Source Code
          </a>{' '}
          | Please donate if you like this:{' '}
          <a
            className='text-blue-500'
            href='https://www.patreon.com/performave'
            target='_blank'
            rel='noreferrer'
          >
            Patreon
          </a>
        </p>
      </div>
    </>
  )
}

export default Home
