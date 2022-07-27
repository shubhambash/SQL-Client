import React from 'react'
import { useState, useContext, useCallback, memo} from 'react'
import './Files.css'
import Utilbar from '../util bar/Utilbar'
import {TableContext} from '../../context/Context'


function Files({content}) {

    // using the Context API
    const {setTable} = useContext(TableContext)
    const [subItems, setSubItems] = useState(null)
    
    const selectTable = useCallback((tableObject) =>
    {
        return (e) => {
            setTable(tableObject)
            setSubItems(tableObject?.filename)
        }
    }
    ,[content])

  return (
    <>
            <div id='files'>
                <div id='filesContainer'>
                <p id='dbName'>Database : Product Customer Relations </p>

                {/* mapping the file names */}
                {content && content?.map((O, index) => {
                    return <>
                    
                    <div className='fileItemContainer' key = {index} onClick={selectTable(O)}>
                    <i class="fas fa-angle-right"></i>

                    <span className='fileItem'>{O?.filename} <span style={{color : 'rgb(201, 122, 2)'}}>({O.columns.length} </span>cols, <span style={{color : 'rgb(201, 122, 2)'}}>{O.rows.length}</span> rows )</span>
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

export default memo(Files)