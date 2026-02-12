import React from 'react';

function OutOfStock({ quantity }) {
    if (quantity === 0) {
        return (
            <div>
                Out Of Stock
            </div>
        )
    }
    return null;
}

export default OutOfStock;