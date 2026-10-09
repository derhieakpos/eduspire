import './courses.css'
import { useState } from 'react'

export function Courses () {
  const [courseCount, setCourseCount] = useState(0)

  return (
    <> 
    <div className='courseContainer'>
      <div className='courseList'>
        <h2>Course List</h2>
        <div className='list'>
           <table>
            <thead>
              <tr>
                <th>Course</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
               <tr>
                <td>HTML CSS & JS</td>
                
                <td><button className='register'
                onClick={() => {
                  setCourseCount(courseCount + 1)
                }}>Register</button></td>
              </tr>
            </tbody>
            <tbody>
               <tr>
                <td>Responsiveness</td>
               
                <td><button className='register'
                onClick={() => {
                  setCourseCount(courseCount + 1)
                }}>Register</button></td>
              </tr>
            </tbody>
            <tbody>
               <tr>
                <td>React</td>
               
                <td><button className='register'
                onClick={() => {
                  setCourseCount(courseCount + 1)
                }}>Register</button></td>
              </tr>
            </tbody>
            <tbody>
               <tr>
                <td>Node JS</td>
                <td><button className='register'
                onClick={() => {
                  setCourseCount(courseCount + 1)
                }}>Register</button></td>
              </tr>
            </tbody>
            <tbody>
               <tr>
                <td>MongoDB</td>
                <td><button className='register'
                onClick={() => {
                  setCourseCount(courseCount + 1)
                }}>Register</button></td>
              </tr>
            </tbody>
             <tbody>
               <tr>
                <td>Git & Github</td>
                <td><button className='register'
                onClick={() => {
                  setCourseCount(courseCount + 1)
                }}>Register</button></td>
              </tr>
            </tbody>
           </table>
        </div>
      </div>
      <div className='courseCount'>
        <p>Course registered: {courseCount}</p>
      </div>
    </div>
    </>
  )
}