import { ChevronDownIcon } from '@heroicons/react/outline'

export interface DropdownItem {
  value: string
  display: string
  disabled?: boolean
}

export interface DropdownProps {
  items: DropdownItem[]
  value?: string
  onChange?: Function
  className?: string
}

const Dropdown = (props: DropdownProps) => {
  const callback = (...args: any) => {
    if (!props.onChange) return

    props.onChange(...args)
  }

  return (
    <div className='relative inline-block'>
      <div
        className={
          'absolute z-10 flex items-center justify-end px-2.5 inset-0 select-none pointer-events-none '
        }
      >
        <ChevronDownIcon className='w-3 h-3' />
      </div>
      <select
        onChange={(...args) => callback(...args)}
        value={props.value}
        className={
          'bg-white transition-colors border w-full hover:border-neutral-700 border-neutral-300 text-sm outline-none rounded px-2.5 py-2  appearance-none ' +
          props.className
        }
      >
        {props.items.map((item) => (
          <option key={item.value} value={item.value} disabled={item.disabled}>
            {item.display}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Dropdown