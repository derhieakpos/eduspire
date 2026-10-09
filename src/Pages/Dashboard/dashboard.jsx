import './dashboard.css'

export function Dashboard () {
  return (
    <>
     <div className='homePage'>
       <div className='homeImage'>
        <p>WELCOME BACK,</p>
        <h2>Adewunmi Olami</h2>
        <p>Access your academic information, results, and assignments all in one place.</p>
       </div>
       <div className='details'>
        <div className='detailsInfo'>
          <h3>Name</h3>
          <p>Adewunmi Olami</p>
        </div>
        <div className='detailsInfo'>
          <h3>Program</h3>
          <p>Software Development</p>
        </div>
        <div className='detailsInfo'>
          <h3>Duration</h3>
          <p>6 months</p>
        </div>
        <div className='detailsInfo'>
          <h3>Session</h3>
          <p>2026/2027</p>
        </div>
        <div className='detailsInfo'>
          <h3>Age</h3>
          <p>20yrs</p>
        </div>
        <div className='detailsInfo'>
          <h3>Status</h3>
          <p>Ongoing</p>
        </div>
       </div>
     </div>
    </>
  )
}