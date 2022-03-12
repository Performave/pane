import Card from '@/components/Card'
import Input from '@/components/Textbox'
import Dropdown from '@/components/Dropdown'
import Button from '@/components/Button'

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
  ]

  return (
    <div className='content'>
      <h3 className='subheading'>Network Tests</h3>
      <Card className='flex mt-4 space-x-2'>
        <Input placeholder='Address'></Input>{' '}
        <Dropdown items={networkTestTypes} /> <Button>Run</Button>
      </Card>
    </div>
  )
}

export default NetworkTests