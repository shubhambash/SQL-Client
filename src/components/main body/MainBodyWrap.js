import React, { useState, useContext, memo, useCallback, useEffect } from 'react'
import { TableContext } from '../../context/Context'
import './MainBodyWrap.css'
import TableComp from './table/TableComp'
import Tippy from '@tippyjs/react';

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
  

function MainBodyWrap({query}) {

    const {table} = useContext(TableContext)
    const [sqlContent, setSqlContent] = useState(query)
    const [filters, setFilters] = useState([])
    const [consoleContent, setConsoleContent] = useState('>>')
    const [copied, setCopied] = useState(false)
    const [fontsize, setFontSize] = useState(12)

    useEffect(() => {
        setSqlContent(query)
    }, [query])


    const handleSqlContent = (e) => {setSqlContent(e.target.value)}

    //simple copy to clipboard
    const handleCopy = useCallback((sqlContent) => {
        return (e) => {
          navigator.clipboard.writeText(sqlContent)
          setCopied(true)
          setTimeout(() => {
            setCopied(false)
          }, 3000)
        }
      },[sqlContent])
    
  
    // modal related states and methods
    const [open, setOpen] = useState(false)
    const [customOpen, setCustomOpen] = useState(false)
    const [shareQOpen, setShareQOpen] = useState(false)

    const handleShareQOpen = useCallback(() => setShareQOpen(true))
    const handleCloseShareQ = useCallback(() => setShareQOpen(false))

    const handleSave = useCallback(() => setOpen(true))
    const handleCloseSave = useCallback(() => setOpen(false))

    const handleCustom = useCallback(() => setCustomOpen(true))
    const handleCloseCustom = useCallback(() => setCustomOpen(false))

  return (
    <>

    {/* responsiveness message when screen width too small*/}
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
                    
                    <p>Either select a pre-defined query from the util bar on the right side or write your own query</p>
                    <p> You may build your own custom query by clicking custom on the sql menu</p>
                    </div>}>
                    <button className='customButton'>
                        <i class="fas fa-info-circle" style={{opacity : '70%'}}></i>
                        &nbsp;&nbsp;help 
                    </button>
                </Tippy>
                <label>
                <input id='numRows' min={12} max={30} type = "number" placeholder="size" onChange={(e) => {setFontSize(e.target.value)}}>
                </input>
                </label>

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
                placeholder="/* Enter your SQL query here */"> </textarea>
 
                {/* Console */}
                <textarea id='sqlConsole' value={consoleContent}></textarea>
                    
                <div id='runOptions'>
                    <div>
                    <button id='runButton' onClick={(e) => {setFilters(dummySqlResultGenerator[query]);setConsoleContent('>> Query took 1.55 s \n>> returned with code 0')}}>
                        <i class="fas fa-play" style={{color : 'white', height : '16px', width : '16px'}}></i> &nbsp; &nbsp;
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
    </>
  )



}

export default memo(MainBodyWrap)


