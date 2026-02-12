import React, { useState, useRef, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Button, Input, Select, Textarea } from '@chakra-ui/react'
import Layout from "../core/Layout";
import { listOrders, getStatusValues, updateOrderStatus } from '../api/admin';

import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'

function Orders() {
    const [orders, setOrders] = useState([]);
    const [statusValues, setStatusValues] = useState([]);

    const loadOrders = () => {
        listOrders().then(data => {
            if (data.error) {
                console.log("err", data.error);
            } else {
                setOrders(data);
            }
        })
    }

    const loadStatusValues = () => {
        getStatusValues().then(data => {
            if (data.error) {
                console.log("err", data.error);
            } else {
                setStatusValues(data);
            }
        })
    }

    useEffect(() => {
        loadOrders();
        loadStatusValues();
    }, []);

    const handleStatusChange = (e, orderId) => {
        updateOrderStatus(orderId, e.target.value).then((data) => {
            if (data.error) {
                console.log("err", data.error)
            } else {
                loadOrders();
            }
        })
    }

    if (orders.length === 0) {
        return (
            <div>
                No orders!
            </div>
        )
    }

    return (
        <TableContainer>
            <Table variant='simple'>
                <TableCaption>Imperial to metric conversion factors</TableCaption>
                <Thead>
                    <Tr>
                        <Th>To convert</Th>
                        <Th>into</Th>
                        <Th isNumeric>multiply by</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        orders.map((order) => (
                            <Tr>
                                <Td>{order.user.name}</Td>
                                <Td>{order.amount / 100}</Td>
                                <Td>{order.status} -
                                    <Select onChange={e => handleStatusChange(e, order._id)} placeholder="Change Status">
                                        {statusValues.map((status) => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </Select>
                                </Td>
                                <Td>{order.address}</Td>
                                <Td>{order.products.length}</Td>

                                {/* <div>{product.createdAt}</div>  oordered on*/}

                                <Td>{
                                    order.products.map((product) => (
                                        <>
                                            <div>{product.name}</div>
                                            <div>{product.price}</div>
                                            <div>{product.count}</div>
                                            <div>{product.createdAt}</div>

                                        </>
                                    ))}
                                </Td>
                            </Tr>))
                    }
                </Tbody>
            </Table>
        </TableContainer >
    )
}

export default Orders;