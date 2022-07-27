import React, { useEffect, useState, memo} from 'react'
import {SAVED, HISTORY, SHARED} from './options'


function CachedQueries({queryOptions, table, handleQuery}) {

    const [queryColumn, setQueryColumn] = useState('savedQueries')

    useEffect(() => {
        setQueryColumn('savedQueries')
        if(queryOptions === SAVED) setQueryColumn('savedQueries')
        else if(queryOptions === HISTORY) setQueryColumn('historyQueries')
        else if(queryOptions === SHARED) setQueryColumn('sharedQueries')
    })

  return (
    <>

        {table && table[queryColumn]?.map((O, index) => 
            {
                return <>
                    <div className='cardItem' key={index} onClick={handleQuery(O)}>
                    
                         <div className='cardHeading'>
                            <span className='cardHeadingText'>{O?.queryName}</span>
                         </div>

                         <div className='cardDesc'>
                            <span className='cardDescText'>{O?.queryDescription}</span>
                         </div>

                         <div className='addedBy'>
                            <div className='addedByName'>
                            <i class="far fa-user-circle"style={{color : 'black', opacity : '40%'}}></i>
                            <span className='addedByText'>{O?.author}</span>
                            </div>

                            <div className=''>
                            <span className='addedByDate'>{O?.daysAgo} days ago</span>
                            </div>
                         </div>    

                    </div>
                </>
            })}
    </>
  )
}

export default memo(CachedQueries)