
const Spinner = ({className ,...props}: Omit<JSX.IntrinsicElements['div'], 'ref'>) => {
  return (
    <div
      className={`spinner_wrapper ${className}`}
      {...props}
      /* style='--spinner-size:16px;' */
    >
      <div className='spinner_spinner'>
        <div className='spinner_bar'></div>
        <div className='spinner_bar'></div>
        <div className='spinner_bar'></div>
        <div className='spinner_bar'></div>
        <div className='spinner_bar'></div>
        <div className='spinner_bar'></div>
        <div className='spinner_bar'></div>
        <div className='spinner_bar'></div>
        <div className='spinner_bar'></div>
        <div className='spinner_bar'></div>
        <div className='spinner_bar'></div>
        <div className='spinner_bar'></div>
      </div>
    </div>
  )
}

export default Spinner
