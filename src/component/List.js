import React,{useState,useEffect} from 'react'
import { Navigate } from 'react-router';
import './list.css'
import PrimarySearchAppBar from './Navbar';
import PPagination from './Pagination';
import {useNavigate}  from 'react-router'
function List() {
    const [allMutualFunds, setallMutualFunds] = useState([]);
    const [currPage,setCurrPage] = useState(1);
    const [limit ,setLimit] = useState(5);
    const [currSearchText, setcurrSearchText] = useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        async function fetchApi(){
            let response = await fetch("https://api.mfapi.in/mf");
            response = await response.json();
            setallMutualFunds(response);
        }
        fetchApi()
    },[])

    console.log(currPage);
    let filterdArr = allMutualFunds.filter((mfobj)=>{
        let title = mfobj.schemeName.trim().toLowerCase();
        return title.includes(currSearchText.toLowerCase());
    });

    let numberOfPages = Math.ceil(filterdArr.length/limit);
    let si = (currPage-1)*limit;
    let ei = si+5;
    filterdArr = filterdArr.slice(si,ei);
    console.log(si+" "+ei);
    function handlenextInfo (id){  
        navigate(`/${id}`)
        
    }
    return (
        <>
        <PrimarySearchAppBar  currSearchText={currSearchText} setcurrSearchText={setcurrSearchText}></PrimarySearchAppBar>
        <div className="container">
            {/* {JSON.stringify(allMutualFunds)} */}
            {/* <input type="text" value={currSearchText} onChange={(e)=>{setcurrSearchText(e.target.value)}}/> */}
            {
                filterdArr.map((mfobj)=>{
                    return (
                        // <div className="mf-container">
                        <div className = "single" key={allMutualFunds.indexOf(mfobj)} onClick={()=>handlenextInfo(`${mfobj.schemeCode}`)}>
                            <div className="schemeName">{mfobj.schemeName}</div>
                            <div className="schemeCode">{mfobj.schemeCode}</div>
                        </div>
                        // </div>
                    )
                })
            }
        </div>
        <PPagination className="pagi" numberOfPages={numberOfPages} currPage={currPage} setCurrPage={setCurrPage}></PPagination>
        </>
    )
}

export default List
