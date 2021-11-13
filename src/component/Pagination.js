import React, { Component } from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
export default function PPagination({numberOfPages,currPage,setCurrPage}) {
    const handleChange = (event, value) => {
        setCurrPage(value);
      };
    return (
        <Stack spacing={2}>
        <Pagination count={numberOfPages} page={currPage} color="primary" onChange={handleChange}/>
        </Stack>
    )
    }

// function Pagination({numberOfPages,currPage,setcurrPage}) {
//                 let pageNumberArr = [];
//                 for(let i=0;i<numberOfPages;i++){
//                     pageNumberArr.push(i+1);
//                 }             
//         return (
//                 //filterd arr
//                 //pagenoarr
//                 //pageno
//                 <nav aria-label="..." className="col-2" >
//                       <ul className="pagination ">
                     
//                      {
//                          pageNumberArr.map((pageNumber) => {
//                              let addition = (pageNumber==currPage)?"page-item active":"page-item"
//                              return (
//                                  <li className={addition} aria-current="page"  onClick={()=>{setcurrPage(pageNumber)}}>
//                                      <span className="page-link">{pageNumber}</span>
//                                  </li>
//                                  )
//                          })
//                      }
//                      </ul>      
//                 </nav>
                
            
//         )
// }

// export default Pagination