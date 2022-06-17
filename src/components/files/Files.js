import React from 'react'
import { useState } from 'react'
import './Files.css'
import Utilbar from '../util bar/Utilbar'
import { useContext } from 'react'
import {TableContext} from './Context'

function Files({content}) {

    
    const {table, setTable} = useContext(TableContext)
    const [subItems, setSubItems] = useState(null)
    
   
    const selectTable = (tableObject) =>
    {
        return (e) => {
            setTable(tableObject)
            setSubItems(tableObject?.filename)
            console.log(table)
        }
    }

    //use context api to store selected table as object
    //util bar and table display will use this state later


  return (
    <>


            <div id='files'>

                

                <div id='filesContainer'>

                <p id='dbName'>Database : Product Customer Relations </p>

                {/* mapping the file names */}

                {content?.map((O, index) => {
                    return <>
                    
                    <div className='fileItemContainer' key = {index} onClick={selectTable(O)}>
                    <i class="fas fa-angle-right"></i>

                        <span className='fileItem'>{O?.filename}</span>

                        
 


                        {subItems === O.filename ? 
                        
                        (<>
                        
                        <div className='fileSubItemConatiner'>
                            {O?.columns?.map((col) => {

                            return <>
                            <div className='fileSubItem'>

                            <i class="fas fa-circle" style={{height : '10px', opacity : '40%', color : 'green'}}></i><span className='fileItem'>{col}</span>

                            </div>
                           
                            </>

                            })}
                        
                        </div>
                        
                        </>)

                        :

                        (<></>)
                    
                    
                        }





                    </div>
                    
                    </>
                })}



                </div>


            </div>

          
            <Utilbar/>
       
               
   
            



    </>
  )
}

export default Files