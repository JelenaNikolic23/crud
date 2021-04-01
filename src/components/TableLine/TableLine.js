import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import PropTypes from "prop-types";
import 'reactjs-popup/dist/index.css';
import NumberFormat from 'react-number-format';

import style from './TableLine.module.scss';
import { Switch } from "../Switch/Switch";
import pen from "../../assest/image/pen.svg";
import trash from "../../assest/image/trash.svg";
import { CampaignServices } from "../../services/campaignServices";

const TableLine = ({item, updateItems, openFormEditing, removeCamp}) => {

    const {id, name, status, budget} = item;
    const [loading, setLoading] = useState(false);


    const toggleSwitch = () => {
        item.status = item.status === 'active' ? 'paused' : 'active';
        CampaignServices.editCampaign(id, item)
            .then(((response) => {
                updateItems(response)
            }));
    };

    const deleteCampaign = (id) => {
            return CampaignServices.deleteCampaign(id)
                .then(() => {
                    removeCamp(id)
                })
    };

    return (
        <tr>
            <td>{name}</td>
            <td>
                <Switch
                    active={status === 'active'}
                    onClick={() => {
                        toggleSwitch(id)
                    }}
                />
            </td>
            <td><NumberFormat value={budget} displayType={'text'} thousandSeparator={true}
                              prefix={'$'} decimalScale={2} allowNegative={false} />
            </td>
            <td><button onClick={() => {openFormEditing(id)}}><img src={pen} />
                </button>
            </td>
            <td>
                <Popup
                    trigger={<button className={style.button}><img src={trash}/></button>}
                    modal >
                    {close => (
                        <div className={style.modal}>
                            <button className={style.close} onClick={close}>
                                &times;
                            </button>
                            <div className={style.header}> Delete campaign </div>
                            <div className={style.content}>
                                {' '}
                                Are you sure you want to delete this campaign?
                            </div>
                            <div className={style.actions}>
                                <div className={style.button1}>
                                    <button
                                        className={style.button1}
                                        onClick={() => {
                                            close();
                                        }}> NO
                                    </button>
                                </div>

                                <div className={style.button2} >
                                    <button
                                        className={style.button2}
                                        type="button"
                                        value="Disable me"
                                        onClick={() => {
                                            setLoading(true);
                                            deleteCampaign(id)
                                            .then(() => {
                                                close();
                                                setLoading(false);
                                            })
                                        }} disabled={loading} > Yes
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </Popup>
            </td>
        </tr>
    );
}
TableLine.propTypes = {
    item: PropTypes.array.isRequired,
    updateItems: PropTypes.func.isRequired,
    openFormEditing: PropTypes.func.isRequired,
    removeCamp: PropTypes.func.isRequired
}
export { TableLine };

