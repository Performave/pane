import React, { useEffect } from 'react'
import Card from '@/components/Card'
import Button from '@/components/Button'
import Input from '@/components/Textbox'
import Dropdown from '@/components/Dropdown'

function App() {
  const networkTestTypes = [
    {
      value: '',
      display: 'Select Test Type',
      disabled: true,
    },
    {
      value: 'ping',
      display: 'ping',
    },
  ]

  const statusStatistics = {
    percentage: 60,
  }

  useEffect(() => {
    const onMount = async () => {
      let networkInfo = await fetch('/info/network')
      console.log(networkInfo.json())
      console.log('tes1')
    }

    console.log('test')

    onMount()
  })

  return (
    <>
      <div className='content sm:py-6 lg:py-8'>
        <h1 className='heading'>AdvinServers - Pane Lookup</h1>
      </div>
      <div className='bg-gray-50 border border-neutral-200'>
        <div className='content'>
          <h3 className='subheading'>Server Information</h3>
          <Card className='grid grid-cols-2 mt-4'>
            <div className='flex flex-col space-y-5'>
              <div>
                <p className='description-title'>SERVER LOCATION</p>
                <p className='description'>Dallas, TX</p>
              </div>
              <div>
                <p className='description-title'>IP VERSION 4</p>
                <p className='description'>127.0.0.1</p>
              </div>
              <div>
                <p className='description-title'>IP VERSION 6</p>
                <p className='description'>::1</p>
              </div>
              <div>
                <p className='description-title'>YOUR IP ADDRESS</p>
                <p className='description'>10.0.0.1</p>
              </div>
            </div>
            <iframe
              title='Google Map'
              className='w-full h-full'
              id='gmap_canvas'
              src='https://maps.google.com/maps?q=dallastx&t=&z=13&ie=UTF8&iwloc=&output=embed'
              frameBorder='0'
              scrolling='no'
              marginHeight={0}
              marginWidth={0}
            ></iframe>
          </Card>
        </div>
      </div>

      <div className='content'>
        <h3 className='subheading'>Network Tests</h3>
        <Card className='flex mt-4 space-x-2'>
          <Input placeholder='Address'></Input>{' '}
          <Dropdown items={networkTestTypes} /> <Button>Run</Button>
        </Card>
      </div>

      <div className='bg-gray-50 border border-neutral-200'>
        <div className='content'>
          <h3 className='subheading'>Benchmarks</h3>
          <Card className='flex flex-col items-center mt-4'>
            <div className='grid grid-cols-2 gap-4 place-items-center'>
              <div className='grid place-items-center'>
                <div className='absolute text-center'>
                  <p className='text-4xl font-bold'>250</p>
                  <p>Tbps</p>
                </div>
                <svg
                  className='transform'
                  viewBox='0 0 128 128'
                  width='128'
                  height='128'
                  style={{ transform: 'rotate(-217deg)' }}
                >
                  <circle
                    r='58'
                    cx='64'
                    cy='64'
                    fill='transparent'
                    stroke='#eaeaea'
                    strokeWidth='12'
                    strokeDasharray={`calc(${
                      70 / 100
                    } * 3.1416 * 116) calc(3.1416 * 116)`}
                    strokeLinecap='round'
                  />
                  <circle
                    r='58'
                    cx='64'
                    cy='64'
                    fill='transparent'
                    stroke='#0CCE6B'
                    strokeWidth='12'
                    strokeDasharray={`calc(${
                      (statusStatistics.percentage * 0.7) / 100
                    } * 3.1416 * 116) calc(3.1416 * 116)`}
                    strokeLinecap='round'
                  />
                </svg>
              </div>
              <div className='flex flex-col space-y-5'>
                <div>
                  <p className='description-title'>DOWNLOAD SPEED</p>
                  <p className='description'>417 Tbps</p>
                </div>
                <div>
                  <p className='description-title'>UPLOAD SPEED</p>
                  <p className='description'>578 Pbps</p>
                </div>
              </div>
            </div>
            <Button className='text-center'>Run Speedtest</Button>
          </Card>
        </div>
      </div>

      <div className='content'>
        <p>Tool created by</p>
        <h1 className='text-7xl font-semibold'>PERFORMAVE</h1>
      </div>
    </>
  )
}

export default App
