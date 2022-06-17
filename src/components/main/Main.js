import React from 'react'
import './Main.css'
import Sidebar from '../sidebar/Sidebar'
import Context from '../files/Context'
function Main() {
  return (
    <>

        <div id='mainWrapper'>

            <div id='mainContainer'>

            <Context>
                <Sidebar />
            </Context>
           
              


            </div>

        </div>
        

    </>
  )
}

export default Main