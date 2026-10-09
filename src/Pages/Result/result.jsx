import './result.css'

export function Result () {
  return (
    <>
     <div className='resultContainer'>
      <div className='correctDetails'>
        <p>Session: 2026/2027</p>
        <p>Programme: Software Development</p>
      </div>
      <div>
        <button className='viewBtn'>View Result</button>
      </div>
     </div>
    </>
  )
}