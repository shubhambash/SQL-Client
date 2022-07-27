import React, { useState, memo } from 'react'
import './Sidebar.css'
import Files from '../files/Files'


function Sidebar() {

    const [content, setContent] = useState([])

    //assuming function call to database to fetch the required content/ tables of the selected DB
    const getData = async () =>
    {
        try {
            const res = await fetch("data.json", 
            {
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                   }
            })
            const data = await res.json()

            if(data)
            {
                setContent(data)
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    useState(() => {
        getData()
    }, [])

  return (
    <>
    
        <div id='sideBar'>

            <div className='sideBarItem'>
                <span className='sidebarIcon'><i class="fas fa-folder fa-2x " style={{color : 'rgb(201, 122, 2)'}}></i></span>
                <div>
                <span className='sideBarText'>Files</span> 
                </div>
            </div>

            <div className='sideBarItem'>
                <span className='sidebarIcon'><i class="fas fa-database fa-2x " style={{color : 'rgb(201, 122, 2)'}}></i>   </span>
                <div>
                <span className='sideBarText'>Database</span>   
                </div>
            </div>


            <div className='sideBarItem'>
                <span className='sidebarIcon'><i class="fas fa-file-import fa-2x " style={{color : 'rgb(201, 122, 2)'}}></i></span>
                <div>
                <span className='sideBarText'>Files</span> 
                </div>
            </div>
        </div>

        <Files content={content}/>
    
    </>
  )
}

export default memo(Sidebar)