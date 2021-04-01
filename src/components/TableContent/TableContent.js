import React from 'react';
import PropTypes from "prop-types";

import { TableLine } from '../TableLine/TableLine';

const TableContent = ({items, updateItems, removeCamp, openFormEditing}) => {

    return (
        <tbody>
            {items.map((item, index) => {
                return <TableLine
                    key={index}
                    item={item}
                    updateItems={updateItems}
                    removeCamp={removeCamp}
                    openFormEditing={openFormEditing}
                />
            })}
        </tbody>
    );
}
TableContent.propTypes = {
    items: PropTypes.array.isRequired,
    updateItems: PropTypes.func.isRequired,
    removeCamp: PropTypes.func.isRequired,
    openFormEditing: PropTypes.func.isRequired
}
export { TableContent };
