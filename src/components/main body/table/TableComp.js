import  React, {useEffect, useState, memo, useCallback} from 'react';
import { DataGrid } from '@mui/x-data-grid';

// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';

function TableComp({table, filters}) {


    const [columns, setColumns] = useState([])
    const [rows, setRows] = useState( [])
    const [colsize, setColsize] = useState(120)
    const [rowsPPage, setRowsPPage] = useState(5)
    const [copied, setCopied] = useState(false)
    const [shareOpen, setShareOpen] = useState(false)
    const [selectedRows, setSelectedRows] = useState(rows)


    const handleShare = () => setShareOpen(true)
    const handleCloseShare = () => setShareOpen(false)

    useEffect(() => {

        const columnsData = []
        if(colsize <= 50)
        {
          setColsize(50)
        }
        if(colsize >= 600)
        {
          setColsize(600)
        }
        table?.columns.map((col) => {
            const colData = {
                field : col,
                headerName : col,
                width : colsize
            }
            columnsData.push(colData)
        })
       
        // simulating fake query run by altering with table data
        if(filters?.length === 3)
        {
          columnsData?.splice(filters[0],filters[1])
        }
        setColumns(columnsData)

        const rowsData = []
        table?.rows.map((Obj) => {
           
            rowsData.push(Obj)

        })

        // simulating fake query run by altering with table data
        if(filters?.length === 3)
        {
          rowsData.splice(0,filters[2])
        }
        setRows(rowsData)

    },[table, filters, colsize])



    const handleCopy = (selectedRows) => {
      return (e) => {
        navigator.clipboard.writeText(JSON.stringify(selectedRows))
        setCopied(true)

        setTimeout(() => {
          setCopied(false)
        }, 3000)
       
      }
    }

    const handleRow = (e) => {
      if(e.target.value > 100)
      {
          return
      }
      else
      {
          setRowsPPage(e.target.value)
      }
    }
    
  return (
    <>

          <div id='tableOptions'> 
          <div>
              <span style={{fontSize : '18px'}}>Table : </span><span id='tableName'>{table?.filename ?(<>{table?.filename}{' '}({rows?.length} entries)</>) : (<><span style={{fontSize : '18px'}}>(--Not Selected--)</span></>)}</span>
          </div>

          <div>
          {copied ? (<>
            <button className='customButton' key={1} style={{color : 'green'}}>
              copied!
            </button>
          </>) :
          (<>
              <button className='customButton' onClick={handleCopy(selectedRows)}>
                    <i class="fas fa-copy" style={{opacity : '70%'}}></i>
                    &nbsp;&nbsp;
                        copy 
             </button>
          </>)}
          </div>
     
          <div>
          <button className='customButton' onClick={handleShare}>
              <i class="fas fa-share-alt" style={{opacity : '70%'}}></i>&nbsp;&nbsp;
              share     
          </button>
          </div>
  
          <div>
          <button className='customButton' style={{width : '30px', padding : '5px'}}
          onClick={(e) => {setColsize(prev => prev - 5)}}>
          <i class="fas fa-minus" style={{opacity : '70%'}}></i>
          </button>

          <span id='customWidth'>
          column width
          </span>
          
          <button className='customButton' style={{width : '30px',padding : '5px', marginRight : '5px'}}
          onClick={(e) => {setColsize(prev => prev + 5)}}>         
          <i class="fas fa-plus" style={{opacity : '70%'}}></i>
          </button>

          <label>
            <input id='numRows' min={5} max={100} type = "number" placeholder="rows" onChange={(e) => {handleRow(e)}}>
            </input>
          </label>

          </div>
  
      </div>


      <div style={{ height: 400, width: '100%' }}>

      {/* loading DataGrid only when table data available to cut performance cost */}
      {table ? (
      <>
      
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={rowsPPage}
        rowsPerPageOptions={[5]}
        checkboxSelection

        // getting selected rows data in JSON format 
        onSelectionModelChange={ids => {
          const selectedIDs = new Set(ids);
         const selectedRowData = rows?.filter((row) => {
          return selectedIDs.has(row.id.toString())
         })
          if(selectedRowData.length !== 0)
          {
            setSelectedRows(selectedRowData)
          }
        }}
      />
  
      </>
    )
    :(<></>)}


  </div>

  </>
  );
}

export default memo(TableComp)