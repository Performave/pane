import Card from '@/components/Card'
import Button from '@/components/Button'
import { useState } from 'react'
import http from '@/util/http'

const Benchmarks = () => {
  const statusStatistics = {
    percentage: 60,
  }


  const [testRunning, setTestRunning] = useState<boolean>(false)

  const handleBenchmark = () => {
    setTestRunning(true)
    let secondsElapsed = 0
    http({
      method: 'get',
      url: '/benchmark',
      onDownloadProgress: (progressEvent) => {
        //console.log("Loaded: " + ((progressEvent.loaded / progressEvent.total) * 100) + "%");
        //console.log(Math.round(progressEvent.loaded * 100 / progressEvent.total))
        console.log((progressEvent / (1024 * 1024)))
      },
    })

  }

  return (
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
                <p className='description-title'>LATENCY</p>
                <p className='description'>34 ms</p>
              </div>
              <div>
                <p className='description-title'>DOWNLOAD SPEED</p>
                <p className='description'>578 Pbps</p>
              </div>
            </div>
          </div>
          <Button className='text-center' onClick={handleBenchmark}>Run Speedtest</Button>
        </Card>
      </div>
    </div>
  )
}

export default Benchmarks