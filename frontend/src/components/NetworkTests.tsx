import Card from '@/components/Card'
import Input from '@/components/Textbox'
import Dropdown from '@/components/Dropdown'
import Button from '@/components/Button'
import { ChevronDownIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import http from '@/util/http'
import Spinner from '@/components/Spinner'

const NetworkTests = () => {
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
    {
      value: 'traceroute',
      display: 'traceroute',
    },
  ]

  const [outputIsVisible, setOutputIsVisible] = useState<boolean>(false)
  const [output, setOutput] = useState<string>('Nothing yet. Run a test first!')

  const [address, setAddress] = useState<string>('')
  const [testType, setTestType] = useState<string>('ping')
  const [runningTest, setRunningTest] = useState<boolean>(false)

  const runTest = async () => {
    setRunningTest(true)
    if (testType === 'ping') {
      try {
        let res = await (await http.post('/run/ping', { address })).data
        let responseArray: string[] = []

        res.forEach((elm: any) => {
          responseArray.push(elm['match'][0])
        })

        setOutput(responseArray.join('<br>'))
      } catch {
        setOutput(
          'Error sending request. Make sure you typed your address correctly or the Pane server is responding.'
        )
      }
    } else if (testType === 'traceroute') {
      try {
        let res = await (await http.post('/run/traceroute', { address })).data
        setOutput(res)
      } catch {
        setOutput(
          'Error sending request. Make sure you typed your address correctly or the Pane server is responding.'
        )
      }
    }

    setOutputIsVisible(true)
    setRunningTest(false)
  }

  return (
    <div className='content'>
      <h3 className='subheading'>Network Tests</h3>
      <Card className='mt-4 space-y-4'>
        <div className='flex space-x-2'>
          <Input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder='Address'
          ></Input>
          <Dropdown
            items={networkTestTypes}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTestType(e.target.value)
            }
          />{' '}
          <Button
            className='flex items-center'
            onClick={runTest}
            disabled={runningTest}
          >
            {runningTest && <Spinner className='mr-2' />} Run
          </Button>
        </div>

        <div
          className={`hover:bg-gray-100 transition-all border rounded ${
            outputIsVisible ? 'h-72' : 'h-8'
          }`}
        >
          <div
            onClick={() => setOutputIsVisible(!outputIsVisible)}
            className='flex items-center px-3 py-1'
          >
            <ChevronDownIcon
              className={`transform transition-transform h-4 w-4 ${
                outputIsVisible ? 'rotate-0' : '-rotate-90'
              }`}
            />
            <p className='ml-2 text-sm select-none'>Output</p>
          </div>

          {outputIsVisible && (
            <div className='bg-black relative w-full h-full overflow-y-scroll'>
              <code
                className='text-white block font-code px-3 py-1'
                dangerouslySetInnerHTML={{ __html: output }}
              ></code>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

export default NetworkTests
