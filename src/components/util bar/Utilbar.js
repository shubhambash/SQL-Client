import React, { useEffect, useState, memo, useCallback, useContext} from 'react'
import './Utilbar.css'
import MainBodyWrap from '../main body/MainBodyWrap'
import {TableContext} from '../../context/Context'
import Tippy from '@tippyjs/react'
import {SAVED, HISTORY, SHARED} from './options'
import CachedQueries from './CachedQueries'


function Utilbar() {
    
    const {table} = useContext(TableContext)
    const [query, setQuery] = useState('')
    const [queryOptions, setQueryOption] = useState(SAVED)

    useEffect(() => {

    }, [queryOptions])

    const handleQuery = useCallback((Object) => {
        return (e) => {
            setQuery(Object.query)
        }
    }, [query] )

  return (
    <>

    <MainBodyWrap query={query}/>

    <div id='utilBarWrapper'>
            <div id='utilBarNav'>
                <div className='utilBarNavItem' onClick={(e) => {setQueryOption(SAVED)}}>
                {queryOptions === SAVED ? 
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

                <div className='utilBarNavItem' onClick={(e) => {setQueryOption(HISTORY)}}>
  
                {queryOptions === HISTORY ? 
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

                <div className='utilBarNavItem' onClick={(e) => {setQueryOption(SHARED)}}>
                    
                    {queryOptions === SHARED ? 
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
                Please select a table from the tables menu on the left side of the app
                </p></div>}>

                <span id='tableName'>
                <i class="fas fa-question-circle"></i>

                &nbsp;&nbsp;(--Table Not Selected--)
       
                </span>
            </Tippy></>) : (<></>)}

            {/* map over all corresponding queries */}
            <CachedQueries queryOptions = {queryOptions} table={table} handleQuery={handleQuery}/>    

        </div>
    </div>

    
    </>
  )
}

export default memo(Utilbar)