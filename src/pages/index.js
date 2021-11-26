import React, { useState, useEffect } from "react";
import api from "../services/api";
import Pagination from "../components/Pagination";

import Image1 from "../tmp/uploads/img1.JPG";
import Image2 from "../tmp/uploads/img2.JPG";
import Image3 from "../tmp/uploads/img3.JPG";
import Image4 from "../tmp/uploads/img4.JPG";

export default function Index() {

    const listProductText = 'Lista de produtos';
    const [filter, setFilter] = React.useState(listProductText);
    const [productList, setProductList] = React.useState();
    const [rowsPerPage, setRowsPerPage] = useState(16);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);

    useEffect(() => {
        loadDados();
    }, [page]);

    useEffect(() => {
        loadDados();
    }, [rowsPerPage]);

    useEffect(() => {
        if(filter.length > 2){
            loadDados(); console.log(filter)
        } 
    }, [filter]);

    const onPageChangePlus = (event) => {
        setPage(page + 1);
    }

    const onPageChangeLess = (event) => {
        setPage(page - 1);
    }

    const onPageChange = (newPage) => {
        setPage(newPage);
    }

    const handleRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
    }

    const hanldeClearFilter = () => {
        setFilter(listProductText);
    }

    const handleFilter = (event) => {
        if(String(event.target.value).length == 0){
            setFilter(listProductText);
        }
        else{
            setFilter(event.target.value);
        }
        
    }

    async function loadDados() {

        var res;
        if(!filter.includes(listProductText)){
            res = await api.get("/product/" + page + "/" + rowsPerPage + "/" + filter);
        }
        else
            res = await api.get("/product/" + page + "/" + rowsPerPage+ "/");
        

        if (res.data !== null) {
            setProductList(res.data.rows);
            setCount(res.data.count[0].Total);
        }
    }



    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8">
                        <h1>mmartan</h1>
                    </div>
                    <div className="col-md-4">
                        <div className="input-group mb-3">
                            <span className="input-group-text">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </span>
                            <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)" onChange={handleFilter} onBlur={handleFilter} />
                            <span className="input-group-text">
                                <a href="#" onClick={hanldeClearFilter}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                                </svg>
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="row header-background">
                    <div className="col padding-top-buton">
                        <h1>{filter}</h1>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col txt-record">
                        <span className="">{count} produtos encontrados - pagina: {page}</span>
                    </div>
                </div>
                <div className="row">
                    <table class="table table-hover">
                        <thead>
                        </thead>
                        <tbody>
                            {productList != null ? productList.map((row, i) => {

                                return (
                                    <>
                                        <tr>
                                            <td className="row-gid-image align-middle"><img src={Image1} style={{ width: 90 }} /></td>
                                            <td className="row-gid-image align-middle"><img src={Image2} style={{ width: 90 }} /></td>
                                            <td className="row-gid-image align-middle"><img src={Image3} style={{ width: 90 }} /></td>
                                            <td className="row-gid-image align-middle"><img src={Image4} style={{ width: 90 }} /></td>
                                            <td className="align-middle"><span>{row.description} <br />{row.category}</span></td>
                                            <td className="row-gid-price align-middle"><span className="price-old">R${row.price_old}</span><span> por R${row.price_new}</span></td>
                                        </tr>
                                    </>
                                )
                            })
                                : ''
                            }
                        </tbody>
                    </table>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="mb-3 head-select col-md-4">
                            <select
                                className="form-select"
                                id="is_simple"
                                value={rowsPerPage}
                                onChange={handleRowsPerPage}
                                aria-label="Default select example">
                                <option value={16} selected>16 produtos por página</option>
                                <option value={30}>30 produtos por página</option>
                                <option value={50}>50 produtos por página</option>
                            </select>
                        </div>
                    </div>
                    <div className="col">
                        <Pagination
                            rowsPerPageOptions={[`15`, `30`, `50`]}
                            count={count}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={onPageChange}
                            onPageChangePlus={onPageChangePlus}
                            onPageChangeLess={onPageChangeLess}
                            onRowsPerPageChange={(e) =>
                                setRowsPerPage(parseInt(e.target.value, 10))
                            } />
                    </div>
                </div>

            </div>
        </>
    )
}