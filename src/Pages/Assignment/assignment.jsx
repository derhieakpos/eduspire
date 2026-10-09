import './assignment.css'
import { useState } from 'react'

export function Assignment () {
     const [assCount, setAssCount] = useState(0)
 
  return(
    <>
     <div className='courseContainer'>
      <div className='courseList'>
        <h2>Assignment</h2>
        <div className='list'>
           <table>
            <thead>
              <tr>
                <th>Course</th>
                <th>Date Due</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
               <tr>
                <td>Frontend Project</td>
                <td>29/10/2026</td>
                <td><button className='register'
                onClick={() => {
                  setAssCount(assCount + 1)
                }}>Submit</button></td>
              </tr>
            </tbody>
            <tbody>
               <tr>
                <td>Git Project</td>
                <td>30/10/2026</td>
                <td><button className='register'
                onClick={() => {
                  setAssCount(assCount + 1)
                }}>Submit</button></td>
              </tr>
            </tbody>
            <tbody>
               <tr>
                <td>Backend Project</td>
                <td>01/11/2026</td>
                <td><button className='register'
                onClick={() => {
                  setAssCount(assCount + 1)
                }}>Submit</button></td>
              </tr>
            </tbody>
           
           </table>
        </div>
      </div>
      <div className='courseCount'>
        <p>Assignment Submitted: {assCount}</p>
      </div>
    </div>
    </>
  )
}