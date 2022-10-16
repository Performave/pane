import Card from '@/components/Card'
import http from '@/util/http'
import { QueryStatus, useQuery } from 'react-query'

interface NetworkInfo {
  location: string
  ip_v4: string
  ip_v6: string
  client_ip: string
}

const SkeletonLoader = ({ status }: { status: QueryStatus }) => {
  return (
    <>
      {status === 'loading' && (
        <div className='skeleton relative w-28 h-5 rounded' />
      )}
    </>
  )
}

const ServerInfo = () => {
  const fetchNetworkInfo = async () => {
    return await (
      await http.get('/info/network')
    ).data
  }

  const { data, status } = useQuery<NetworkInfo, Error>(
    'networkInfo',
    fetchNetworkInfo
  )

  return (
    <div className='bg-gray-50 border border-neutral-200'>
      <div className='content'>
        <h3 className='subheading'>Server Information</h3>
        <Card className='grid md:grid-cols-2 mt-4'>
          <div className='flex flex-col space-y-5'>
            <div>
              <p className='description-title'>SERVER LOCATION</p>
              <SkeletonLoader status={status} />
              <p className='description'>{data?.location}</p>
            </div>
            <div>
              <p className='description-title'>IP VERSION 4</p>
              <SkeletonLoader status={status} />
              <p className='description'>{data?.ip_v4}</p>
            </div>
            <div>
              <p className='description-title'>IP VERSION 6</p>
              <SkeletonLoader status={status} />
              <p className='description'>{data?.ip_v6}</p>
            </div>
            <div>
              <p className='description-title'>YOUR IP ADDRESS</p>
              <SkeletonLoader status={status} />
              <p className='description'>{data?.client_ip}</p>
            </div>
          </div>
          <div className='mt-5 md:mt-0 rounded relative'>
            {status !== 'loading' && (
              <iframe
                title='Google Map'
                className='w-full h-full relative z-10'
                id='gmap_canvas'
                src={`https://maps.google.com/maps?q=${data?.location}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                frameBorder='0'
                scrolling='no'
                marginHeight={0}
                marginWidth={0}
              ></iframe>
            )}
            <div className='absolute z-0 inset-0 skeleton' />
          </div>
        </Card>
      </div>
    </div>
  )
}

export default ServerInfo
