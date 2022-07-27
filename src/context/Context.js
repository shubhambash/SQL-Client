import React, { useState, createContext } from 'react'

export const TableContext = createContext()
const Context = ({children}) => {

    const [table, setTable] = useState()
  return (
    <>

    <TableContext.Provider value={{table, setTable}}>
        {children}
    </TableContext.Provider>

    </>
  )
}

export default Context