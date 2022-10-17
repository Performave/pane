import Card from '@components/Card'
import http from '@util/http'

interface Props {
  data: {
    location: string
    ipv4: string
    ipv6: string
    clientIp: string
  }
}

const ServerInfo = ({ data }: Props) => {
  return (
    <div className='bg-gray-50 border border-neutral-200'>
      <div className='content'>
        <h3 className='subheading'>Server Information</h3>
        <Card className='grid md:grid-cols-2 mt-4'>
          <div className='flex flex-col space-y-5'>
            <div>
              <p className='description-title'>SERVER LOCATION</p>
              <p className='description'>{data.location}</p>
            </div>
            <div>
              <p className='description-title'>IP VERSION 4</p>
              <p className='description'>{data.ipv4}</p>
            </div>
            <div>
              <p className='description-title'>IP VERSION 6</p>
              <p className='description'>{data.ipv6}</p>
            </div>
            <div>
              <p className='description-title'>YOUR IP ADDRESS</p>
              <p className='description'>{data.clientIp}</p>
            </div>
          </div>
          <div className='mt-5 md:mt-0 rounded relative'>
            <iframe
              title='Google Map'
              className='w-full h-full relative z-10'
              id='gmap_canvas'
              src={`https://maps.google.com/maps?q=${data.location}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
              frameBorder='0'
              scrolling='no'
              marginHeight={0}
              marginWidth={0}
            ></iframe>
            <div className='absolute z-0 inset-0 skeleton' />
          </div>
        </Card>
      </div>
    </div>
  )
}

export default ServerInfo
