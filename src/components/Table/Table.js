import React from 'react';
import PropTypes from 'prop-types'

import './Table.module.scss';
import { TableContent } from "../TableContent/TableContent";

const Table = ({ updateItems, items, removeCamp, openFormEditing}) => {

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Budget</th>
                    <th>Action</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <TableContent
                updateItems={updateItems}
                items={items}
                removeCamp={removeCamp}
                openFormEditing={openFormEditing}
            />
        </table>
    );
}
Table.propTypes = {
    updateItems: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    removeCamp: PropTypes.func.isRequired,
    openFormEditing: PropTypes.func.isRequired
}

export { Table };
