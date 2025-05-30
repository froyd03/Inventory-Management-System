import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import '../styles/Pagination.css'
import { useEffect, useRef, useState } from 'react';

export default function Pagination(props){

    const LIMIT_PAGE = 4;
    const PAGE_NUMBER = Math.ceil(props.numberOfData / props.maxPerPage);
    const TOTAL_PAGE = PAGE_NUMBER > LIMIT_PAGE ? LIMIT_PAGE : PAGE_NUMBER;

    let activeRef = useRef([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        activeRef.current.forEach((element, i) => {
            activeRef.current[index].classList.add('pageActive');
            if(i !== index && element.classList.contains('pageActive')){
                element.classList.remove('pageActive');
            }
        });
    }, [index]);

    useEffect(() => {
        activeRef.current = activeRef.current.filter(value => value !== null);
        setIndex(0);
        setCount(0);
    }, [PAGE_NUMBER])

    const [adjustCount, setCount] = useState(0);
    function handleNextBtn(){
        if(index < TOTAL_PAGE-1){
            setIndex(i => i + 1);
        }else if(PAGE_NUMBER > LIMIT_PAGE && index == (LIMIT_PAGE-1) && PAGE_NUMBER !== (adjustCount+LIMIT_PAGE)){
            setCount(c => c + 1);
        }else return;
    }

    function handlePrevBtn(){
        const rear = adjustCount+LIMIT_PAGE;
        const current = (index+1)+adjustCount;
        const front = rear-3;

        if(index > 0){
            setIndex(i => i - 1);
        }else if(front === current && current !== 1){
            setCount(c => c - 1);
        }else return;
    }

    return (
        <div id="pagination-controls"> 
            <ArrowBackIosNewIcon onClick={handlePrevBtn} color='primary' sx={{fontSize:15}}/>
            <button onClick={handlePrevBtn} id="prevPageBtn" className="pagination-btn" >previous</button>
                {Array.from({length: TOTAL_PAGE || 1}, (_, index) => (
                    <span 
                        key={index} 
                        className='pageInfo' 
                        ref={(el) => (activeRef.current[index] = el)}>
                        {(index+1)+adjustCount}
                    </span>
                ))}
            <button onClick={handleNextBtn} id="nextPageBtn" className="pagination-btn" >Next</button>
            <ArrowForwardIosIcon onClick={handleNextBtn} color='primary' sx={{fontSize:15}}/>
        </div>
    )
}