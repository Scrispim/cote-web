import React, { useEffect } from "react";
import api from "../services/api";


export default function Pagination(props) {

    const [currentPage, setCurrentPage] = React.useState(0);
    const [prevPage, setPrevPage] = React.useState();
    const [nextPage, setNexPage] = React.useState();

    const {count, rowsPerPage, page, onPageChange, onPageChangePlus, onPageChangeLess, onRowsPerPageChange} = props;

    const isLastPage = () => {
        var total = (count / rowsPerPage);

        return (page >= total)
    }

    const PageControl = (index) => {
        
        var newIndex = 0;
        
        if((page + index) <= 4){            
            newIndex = 2;
        }
        else if(isLastPage()){
            newIndex = page -1;
        }
        else{
            newIndex = page;
        }

        switch (index) {
            case 1:
                newIndex = newIndex - 1;
                break;

            case 2:
                newIndex = newIndex;
                break;

            case 3:
                newIndex = newIndex + 1;
                break;
        
            default:
                break;
        }

        return newIndex
    }

    const isCurrentPage = (index) => {
        console.log(page, index);
        if(page == index) return true;
    }

    return (
        <>
            <nav aria-label="Navegação de página exemplo">
                <ul className="pagination justify-content-end">
                    <li className={page < 2? "page-item disabled" : "page-item"} >
                        <a className="page-link" href="#" tabindex="-1" onClick={props.onPageChangeLess}>Anterior</a>
                    </li>
                    <li className="page-item"><a className="page-link" href="#" onClick={() => onPageChange(PageControl(1))}>{PageControl(1)}</a></li>
                    <li className="page-item"><a className="page-link"  href="#" onClick={() => onPageChange(PageControl(2))}>{PageControl(2)}</a></li>
                    <li className="page-item"><a className="page-link" href="#" onClick={() => onPageChange(PageControl(3))}>{PageControl(3)}</a></li>
                    <li className={isLastPage()? "page-item disabled" : "page-item"}>
                        <a className="page-link" href="#" onClick={props.onPageChangePlus}>Next</a>
                    </li>
                </ul>
            </nav>
        </>
    );
}
