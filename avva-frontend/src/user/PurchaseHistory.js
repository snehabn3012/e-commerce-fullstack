import React, { useEffect, useState } from 'react';
import { getPurchaseHistory } from '../api/user';

function PurchaseHistory() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        getPurchaseHistory().then((data) => {
            setHistory(data);
        })
    }, [])

    return (
        <div className="card mb-5">
            <h3 className="card-header">Purchase history</h3>
            <ul className="list-group">
                <li className="list-group-item">
                    {history?.map((h, i) => {
                        return (
                            <div>
                                <hr />
                                {h?.products.map((p, i) => {
                                    return (
                                        <div key={i}>
                                            <h6>Product name: {p.name}</h6>
                                            <h6>Product price: ${p.price}</h6>
                                            <h6>
                                                Purchased date:{" "}
                                                {p.createdAt}
                                                {/* {moment(p.createdAt).fromNow()} */}
                                            </h6>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </li>
            </ul>
        </div>
    );
};

export default PurchaseHistory;