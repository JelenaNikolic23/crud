import React, { useState } from "react";
import PropTypes from "prop-types";

import style from "./Form.module.scss";
import Campaign from "../../entities/Campaign";
import { CampaignServices } from "../../services/campaignServices";

const Form = ({closeForm, updateCampaign, removeCamp}) => {
    const [name, setName] = useState('');
    const [budget, setBudget] = useState(0);
    const [status, setStatus] = useState('status');
    const [isLoading, setIsLoading] = useState(false);

    const addCampaign = () => {
        setIsLoading(true);
        const newCampaign = new Campaign({id: null, name,  status, budget});
           updateCampaign(newCampaign);
            CampaignServices.saveCampaign(newCampaign).then(() => {
                setIsLoading(false);
                setName('');
                setStatus('');
                setBudget(0);
            })
                .catch((e) => {
                    setTimeout(() =>{
                        removeCamp(null)
                        setIsLoading(false);
                        window.alert(e.message);
                    }, 2000)
                });
    };

     return (
         <div>
             <div className={style.form}>
                <h3> Add Campaign</h3>

                <input
                    name='name'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    type='text'
                    placeholder='Name'
                />

                <select name='status' value={status} onChange={e => setStatus(e.target.value)}>
                    <option value="status"> Status</option>
                    <option value="active"> Active</option>
                    <option value="paused"> Paused</option>
                </select>

                <input name='budget'
                       value={budget}
                       onChange={e => setBudget(e.target.value)}
                       type='number'
                       min='0'
                       placeholder='Budget'
                />


                <input className={style.buttonLeft} value='Cancel' type='reset' onClick={closeForm}/>
                <input className={style.buttonRight} disabled={isLoading} value={isLoading ? 'Saving...' : 'Add'}
                       type='submit' onClick={addCampaign}/>
             </div>
         </div>
    );
}

Form.propTypes = {
    closeForm: PropTypes.func,
    updateCampaign: PropTypes.func.isRequired,
    removeCamp: PropTypes.func
}
Form.defaultProps = {
    closeForm: () => {},
    removeCamp: () => {}
}
export { Form };
