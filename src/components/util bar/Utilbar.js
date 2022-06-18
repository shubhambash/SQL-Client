import React, { useState } from 'react'
import './Utilbar.css'
import MainBodyWrap from '../main body/MainBodyWrap'
import { useContext } from 'react'
import {TableContext} from '../files/Context'
import Tippy from '@tippyjs/react'
function Utilbar() {
    
    const {table} = useContext(TableContext)
    const [query, setQuery] = useState('')
    const [queryOptions, setQueryOption] = useState('saved')

    const handleQuery = (Object) => {
        return (e) => {
            setQuery(Object.query)
        }
    }
 

  return (
    <>

    
 
    <MainBodyWrap query={query}/>


    <div id='utilBarWrapper'>

        

            <div id='utilBarNav'>

                <div className='utilBarNavItem' onClick={(e) => {setQueryOption('saved')}}>
                {queryOptions === 'saved' ? 
                    (
                        <>
                            <span className='utilNavItemClicked'>
                                saved
                            </span>
                        </>
                    )
                    :
                    (
                        <>
                            <span className='utilNavItem'>
                                saved
                            </span>
                        </>
                    )
                    
                    }
                </div>

                <div className='utilBarNavItem' onClick={(e) => {setQueryOption('history')}}>
  
                {queryOptions === 'history' ? 
                    (
                        <>
                            <span className='utilNavItemClicked'>
                                history
                            </span>
                        </>
                    )
                    :
                    (
                        <>
                            <span className='utilNavItem'>
                                history
                            </span>
                        </>
                    )
                    
                    }

        
                </div>

                <div className='utilBarNavItem' onClick={(e) => {setQueryOption('shared')}}>
                    
                    {queryOptions === 'shared' ? 
                    (
                        <>
                            <span className='utilNavItemClicked'>
                                shared
                            </span>
                        </>
                    )
                    :
                    (
                        <>
                            <span className='utilNavItem'>
                                shared
                            </span>
                        </>
                    )
                    
                    }


                    





                    
                </div>

            </div>

        <div id='utilBarBody'>


            {!table ? (<>
                
            <Tippy placement='bottom' content={
            
                <div id='tableNotSelected'>
                <p>
                please select a table from the tables menu on the left side of the app
                </p></div>}
            >

                <span id='tableName'>
                <i class="fas fa-question-circle"></i>

                &nbsp;&nbsp;(--Table Not Selected--)
       
                </span>
                
            </Tippy></>) : (<></>)}


            {queryOptions === 'saved' && table?.savedQueries?.map((O, index) => 
            {
                return <>

                    <div className='cardItem' key={index} onClick={handleQuery(O)}>

                        <div className='cardShare'>
                            
                        </div>


                         <div className='cardHeading'>

                            <span className='cardHeadingText'>{O.queryName}</span>

                         </div>

                         <div className='cardDesc'>
                            <span className='cardDescText'>{O.queryDescription}</span>
                         </div>

                         <div className='addedBy'>

                            <div className='addedByName'>
                            <i class="far fa-user-circle"style={{color : 'black', opacity : '40%'}}></i>
                            <span className='addedByText'>{O.author}</span>
                            </div>

                            <div className=''>
                            <span className='addedByDate'>{O.daysAgo} days ago</span>
                            </div>
                            
                         </div>
                                    
                    </div>
                
                
                </>
            })}




            {queryOptions === 'history' && table?.historyQueries?.map((O, index) => 
            {
                return <>

                    <div className='cardItem' key={index} onClick={handleQuery(O)}>

                        <div className='cardShare'>
                            
                        </div>


                         <div className='cardHeading'>

                            <span className='cardHeadingText'>{O.queryName}</span>

                         </div>

                         <div className='cardDesc'>
                            <span className='cardDescText'>{O.queryDescription}</span>
                         </div>

                         <div className='addedBy'>

                            <div className='addedByName'>
                            <i class="far fa-user-circle"style={{color : 'black', opacity : '40%'}}></i>
                            <span className='addedByText'>{O.author}</span>
                            </div>

                            <div className=''>
                            <span className='addedByDate'>{O.daysAgo} days ago</span>
                            </div>
                            
                         </div>
                                    
                    </div>
                
                
                </>
            })}





            {queryOptions === 'shared' && table?.sharedQueries?.map((O, index) => 
            {
                return <>

                    <div className='cardItem' key={index} onClick={handleQuery(O)}>

                        <div className='cardShare'>
                            
                        </div>


                         <div className='cardHeading'>

                            <span className='cardHeadingText'>{O.queryName}</span>

                         </div>

                         <div className='cardDesc'>
                            <span className='cardDescText'>{O.queryDescription}</span>
                         </div>

                         <div className='addedBy'>

                            <div className='addedByName'>
                            <i class="far fa-user-circle"style={{color : 'black', opacity : '40%'}}></i>
                            <span className='addedByText'>{O.author}</span>
                            </div>

                            <div className=''>
                            <span className='addedByDate'>{O.daysAgo} days ago</span>
                            </div>
                            
                         </div>
                                    
                    </div>
                
                
                </>
            })}





            
        </div>




    </div>

    
    </>
  )
}

export default Utilbar