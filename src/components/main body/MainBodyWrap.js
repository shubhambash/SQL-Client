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



    const dummySqlResultGenerator = 
    {
        "SELECT * FROM products WHERE productName = 'chai'" : [1,1,0],
        "SELECT * FROM products WHERE unitsInOrder SORTED" : [2,5,0],
        "SELECT productName, supplierid FROM products WHERE discontinued = 0" : [4,6,0],
        "SELECT productId, productName, unitPrice FROM products WHERE unitPrice BETWEEN 1000 AND 3000" : [5,5,5]        

    }


    const [sqlContent, setSqlContent] = useState(query)
    const {table} = useContext(TableContext)
    const [filters, setFilters] = useState([])
    const[consoleContent, setConsoleContent] = useState('>>')
    const [copied, setCopied] = useState(false)

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


      const [open, setOpen] = useState(false)
      const [customOpen, setCustomOpen] = useState(false)
      const handleSave = () => setOpen(true)
      const handleCloseSave = () => setOpen(false)

      const handleCustom = () => setCustomOpen(true)
      const handleCloseCustom = () => setCustomOpen(false)


  

  return (
    <>

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


                    
                <Tippy placement='bottom' content={<div id='help'><p>
                    Either select a pre-defined query from the util bar on the right side or write your own query
                    </p>
                    <p>You may build your own custom query by clicking custom on the sql menu</p></div>}>
                    <button className='customButton'>
                        <i class="fas fa-info-circle" style={{opacity : '70%'}}></i>
                        &nbsp;&nbsp;help 
                    </button>
                </Tippy>
                                    

                    &nbsp;&nbsp;&nbsp;&nbsp;


                    <button className='customButton' onClick={handleSave}>
                    <i class="fas fa-save" style={{opacity : '70%'}}></i>
                    &nbsp;&nbsp;save </button>




                    <button className='customButton'>
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
                

                <textarea id='sqlEditor' value={sqlContent} onChange={(e) => {handleSqlContent(e)}}
                placeholder="/* Enter your SQL query here */">
                    
                </textarea>

            
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



    </>
  )
}

export default MainBodyWrap