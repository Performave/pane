import Card from '@/components/Card'
import Button from '@/components/Button'
import { useMemo, useState } from 'react'
import http from '@/util/http'
import Spinner from '@/components/Spinner'
import { StopIcon } from '@heroicons/react/outline'

interface Progress {
  time: number
  size: number
}

const Benchmarks = () => {
  const [testRunning, setTestRunning] = useState<boolean>(false)
  const [bpsHistory, setBpsHistory] = useState<number[]>([])
  const bytesPerSecond = useMemo(() => {
      // get largest number in bps bpsHistory
      let largest = 0
      for (let i = 0; i < bpsHistory.length; i++) {
        if (bpsHistory[i] > largest) largest = bpsHistory[i]
      }
      return largest
  }, [bpsHistory])
  const [latency, setLatency] = useState<number>(0)

  const calculateGraph = (): number => {
    if (!testRunning) return 0
    let Mbps = Math.floor((bytesPerSecond * 8) / 1048576)
    if (Mbps > 100) return 100

    return Mbps
  }
  const percentage = useMemo(calculateGraph, [bytesPerSecond, testRunning])

  const progressToHuman = (bytes: number) => {
    if (bytes === 0) return [0, 'Bit/s']
    let bits = bytes * 8

    const k = 1024
    const sizes = [
      'Bit/s',
      'Kbps',
      'Mbps',
      'Gbps',
      'Tbps',
      'Pbps',
      'Ebps',
      'Zbps',
      'Ybps',
    ]

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return [Math.floor(bits / Math.pow(k, i)), sizes[i]]
  }

  const [humanSize, humanUnit] = useMemo(
    () => progressToHuman(bytesPerSecond),
    [bytesPerSecond]
  )

  const [controller, setController] = useState((new AbortController()))

  const cancelBenchmark = () => {
    controller.abort()

    setTestRunning(false)
    setController((new AbortController()))
  }

  const handleDownload = () => {
    window.open(`${http.defaults.baseURL}benchmark`)
  }

  const handleBenchmark = async () => {
    setTestRunning(true)
    setBpsHistory([])

    let time = performance.now()
    await http.get('/benchmark/latency')
    setLatency(Math.floor(performance.now() - time))

    let startTime = new Date()
    let progressLog: Progress[] = []

    http({
      method: 'get',
      url: '/benchmark',
      signal: controller.signal,
      onDownloadProgress: (progressEvent) => {
        progressLog.push({
          time: (new Date().getTime() - startTime.getTime()) / 1000, // converts MS to S
          size: progressEvent.loaded,
        })

        if (progressLog.length > 3) progressLog.shift()

        if (progressLog.length > 1) {
          let delta = progressLog[progressLog.length - 1]
          let x = progressLog[progressLog.length - 2]

          let topDiff = delta.size - x.size
          let bottomDiff = delta.time - x.time

          setBpsHistory((old) => {
            let newHistory = [...old, topDiff / bottomDiff]
            // only keep last 10 values
            if (newHistory.length > 10) newHistory.shift()

            return newHistory
          })
        }

        if (progressEvent.loaded === progressEvent.total) setTestRunning(false)
      },
    })
  }

  return (
    <div className='bg-gray-50 border border-neutral-200'>
      <div className='content'>
        <h3 className='subheading'>Benchmarks</h3>
        <Card className='flex flex-col items-center mt-4'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 place-items-center'>
            <div className='grid place-items-center'>
              <div className='absolute text-center'>
                <p className='text-4xl font-bold'>{humanSize}</p>
                <p>{humanUnit}</p>
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
                  className='transition-all'
                  strokeDasharray={`calc(${
                    (percentage * 0.7) / 100
                  } * 3.1416 * 116) calc(3.1416 * 116)`}
                  strokeLinecap='round'
                />
              </svg>
            </div>
            <div className='flex flex-col space-y-5'>
              <div>
                <p className='description-title'>LATENCY</p>
                <p className='description'>{latency} ms</p>
              </div>
              <div>
                <p className='description-title'>DOWNLOAD SPEED</p>
                <p className='description'>{humanSize + ' ' + humanUnit}</p>
              </div>
            </div>
          </div>
          <div className='flex items-center flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-2 sm:mt-0'>
            <Button
              className='text-center flex'
              onClick={handleBenchmark}
              disabled={testRunning}
            >
              {testRunning && <Spinner className='mr-2' />} Run Speedtest
            </Button>
            {testRunning && (
              <Button onClick={cancelBenchmark} isOutlined className='text-center flex'>
                <StopIcon className='h-5 w-5' />
              </Button>
            )}
            <Button
              className='text-center flex'
              onClick={handleDownload}
              isOutlined
            >
               500 MB Test File
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Benchmarks
