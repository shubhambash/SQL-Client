import React, { useState, useContext } from 'react'
import { useEffect } from 'react'
import { TableContext } from '../files/Context'
import './MainBodyWrap.css'
import TableComp from './table/TableComp'
import Tippy from '@tippyjs/react';



import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '1px dotted #000',
  boxShadow: 24,
  p: 4,
};


function MainBodyWrap({query}) {


    // dummy data to generate SQL run simulations
    const dummySqlResultGenerator = 
    {
        "SELECT * FROM products WHERE productName = 'chai'" : [1,1,0],
        "SELECT * FROM products WHERE unitsInOrder SORTED" : [2,5,0],
        "SELECT productName, supplierid FROM products WHERE discontinued = 0" : [4,6,0],
        "SELECT productId, productName, unitPrice FROM products WHERE unitPrice BETWEEN 1000 AND 3000" : [5,5,5],    
        "SELECT * FROM customers WHERE country = 'India'" : [1,2,0],
        "SELECT * FROM customers WHERE customerId SORTED" : [1,5,8],
        "SELECT companyName, supplierid FROM customers WHERE regularity BETWEEN 20 AND 30" : [3,3,6],
        "SELECT * FROM products WHERE spam = true INNER JOIN companyName, supplierid FROM customers WHERE regularity BETWEEN 20 AND 30" : [1,5,16],
        "SELECT saleId FROM sales WHERE unitsInStock MINIMUM" : [1,3,550],
        "SELECT * FROM sales WHERE sales insight" : [0,0,500],
        "SELECT saleId,maxBuyers FROM products WHERE some_attributes" : [1,1,100],
        "SELECT * FROM products WHERE unitsInStock MAXIMUM" : [1,4,600]

    }


    const [sqlContent, setSqlContent] = useState(query)
    const {table} = useContext(TableContext)
    const [filters, setFilters] = useState([])
    const[consoleContent, setConsoleContent] = useState('>>')
    const [copied, setCopied] = useState(false)
    const [fontsize, setFontSize] = useState(12)

    useEffect(() => {
        setSqlContent(query)
    }, [query])



    const handleSqlContent = (e) => {setSqlContent(e.target.value)}
    const handleCopy = (sqlContent) => {
        return (e) => {
          navigator.clipboard.writeText(sqlContent)
          setCopied(true)
  
          setTimeout(() => {
            setCopied(false)
          }, 3000)
         
        }
      }


    // modal related states and methods
      const [open, setOpen] = useState(false)
      const [customOpen, setCustomOpen] = useState(false)
      const [shareQOpen, setShareQOpen] = useState(false)

      const handleShareQOpen = () => setShareQOpen(true)
      const handleCloseShareQ = () => setShareQOpen(false)

      const handleSave = () => setOpen(true)
      const handleCloseSave = () => setOpen(false)

      const handleCustom = () => setCustomOpen(true)
      const handleCloseCustom = () => setCustomOpen(false)


  

  return (
    <>

    <div id='increaseScreen'>
        <div id='increaseScreenMsg'>
            <h4>Please Increase Screen Width To Use Editor</h4>
        </div>
    </div>

    <div id='mainBodyWrapper'>

        <div id='sqlEditorWrapper'>


            <div id='sqlEditorContainer'>

                <div id='editorOptions'>

                <div>
                    
          
                    {copied ? 
                    (<>
                        <button className='customButton' key={1} style={{color : 'green'}}>
                            copied!
                        </button>
                    </>)
                    :
                    (<>
                            <button className='customButton' onClick={handleCopy(sqlContent)}>
                                <i class="fas fa-copy" style={{opacity : '70%'}}></i>
                                
                                    &nbsp;&nbsp;
                                    copy 
                                
                            </button>
                    </>)
                    
                    }


                    
                <Tippy placement='bottom' 
                content={<div id='help'>
                    <p>
                    Either select a pre-defined query from the util bar on the right side or write your own query
                    </p>
                    <p>
                        You may build your own custom query by clicking custom on the sql menu
                    </p></div>}
                >

                    <button className='customButton'>
                        <i class="fas fa-info-circle" style={{opacity : '70%'}}></i>
                        &nbsp;&nbsp;help 
                    </button>

                </Tippy>

                <input id='numRows' min={12} max={30} type = "number" placeholder="size" onChange={(e) => {setFontSize(e.target.value)}}>
                </input>
                                    

                    &nbsp;&nbsp;&nbsp;&nbsp;


                    <button className='customButton' onClick={handleSave}>
                    <i class="fas fa-save" style={{opacity : '70%'}}></i>
                    &nbsp;&nbsp;save </button>




                    <button className='customButton' onClick={handleShareQOpen}>
                    <i class="fas fa-share-alt" style={{opacity : '70%'}}></i>
                    &nbsp;&nbsp;share</button>

                    <button className='customButton'>
                    <i class="fas fa-download" style={{opacity : '70%'}}></i>
                  
                    &nbsp;&nbsp;download</button>


                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <button className='customButton' onClick={handleCustom}>
                    <i class="fas fa-hammer" style={{opacity : '70%'}}></i>
                    &nbsp;&nbsp;custom</button>

                </div>

                </div>
                
                {/* SQL Editor Textarea */}
                <textarea id='sqlEditor' style={{fontSize : `${fontsize}px`}}  value={sqlContent} onChange={(e) => {handleSqlContent(e)}}
                placeholder="/* Enter your SQL query here */">
                    
                </textarea>

                {/* Console */}
                <textarea id='sqlConsole' value={consoleContent}>
                    
                </textarea>

                <div id='runOptions'>
                    
                    <div>
                  
                    <button id='runButton' onClick={(e) => {setFilters(dummySqlResultGenerator[query]);setConsoleContent('>> Query took 1.55 s \n>> returned with code 0')}}>
                    <i class="fas fa-play" style={{color : 'white', height : '16px', width : '16px'}}></i> 
                    &nbsp; &nbsp;
                        Run
                    
                    </button>

                    </div>

                </div>
                               
            </div>

        </div>

        
        <div id='results'>
       
        <TableComp table={table} filters={filters}/>

        </div>

    </div>



    {/* Modals */}

    <Modal
        open={open}
        onClose={handleCloseSave}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

            

            <div className='modalBody'>

                <div>
                <h3>Save query </h3>
                </div>

                    <div>
                    <form>
                    <div>
                    <input className='saveName' placeholder='Enter Query Title'></input>
                    </div>

                    <div>
                    <input className='saveName' placeholder='Enter Your Name'></input>
                    </div>


                    <div>
                    <textarea className='saveTextArea' placeholder='Enter query description'></textarea>
                    </div>


                    <div>
                    <textarea value={sqlContent} className='saveTextArea' placeholder='Enter SQL Query'></textarea>
                    </div>

                    <div>
                    <button className='saveModal' type='submit'>save 
                   
                   </button>
                    </div>
                    
                </form>

                    </div>
                
            </div>
         
        </Box>
      </Modal>





      <Modal
        open={customOpen}
        onClose={handleCloseCustom}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

            

            <div className='modalBody'>

                <div>
                <h3>Build Query </h3>
                </div>

                    <div>
                    <form>
                    <div>
                    <input className='saveName' placeholder='Enter column'></input>
                    </div>

                    <div>
                    <input className='saveName' placeholder='Enter table name'></input>
                    </div>

                    <div>
                    <input className='saveName' placeholder='Enter filter'></input>
                    </div>

                    <div>
                    <input className='saveName' placeholder='Enter joins'></input>
                    </div>

                    <div>
                    <button className='saveModal' type='submit'>build 
                   
                   </button>
                    </div>
                    
                </form>

                    </div>
                
            </div>
         
        </Box>
      </Modal>




      <Modal
        open={shareQOpen}
        onClose={handleCloseShareQ}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

            <div className='modalBody'>
                <div>
                <h3>Share Current Query With Team</h3>
                </div>

                    <div>
                    <form>
                    <div>
                    <input className='saveName' placeholder='Enter Query Title'></input>
                    </div>

                    <div>
                    <textarea className='saveTextArea' placeholder='Enter Query Description'></textarea>
                    </div>


                    <div>
                    <textarea value={sqlContent} className='saveTextArea' placeholder='Enter SQL Query'></textarea>
                    </div>
                    

                    <div>
                    <button className='saveModal' type='submit'>Share 
                   
                   </button>
                    </div>
                    
                </form>

                    </div>
                
            </div>
         
        </Box>
      </Modal>


    </>
  )
}

export default MainBodyWrap