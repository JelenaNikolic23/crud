import React, { useState } from "react";
import PropTypes from "prop-types";

import style from "./FormEditing.module.scss";
import Campaign from "../../entities/Campaign";
import {CampaignServices} from "../../services/campaignServices";

const FormEditing = ({closeForm, campaign, updateEditingCamp}) => {
    const [name, setName] = useState(campaign.name);
    const [budget, setBudget] = useState(campaign.budget);
    const [status, setStatus] = useState(campaign.status);
    const [id, setId] = useState(campaign.id);
    const [isLoading, setIsLoading] = useState(false);

    const editingCampaign = () => {
        setIsLoading(true)
        const editCamp = new Campaign ({id, name, status, budget})
        CampaignServices.editCampaign(id, editCamp).then((campaign) =>{
            setIsLoading(false);
            updateEditingCamp(campaign);
            closeForm();
        });
    }

    return (
        <div>
            <div className={style.formEditing}>
                <h3> Edit Campaign</h3>

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
                <input className={style.buttonRight} disabled={isLoading} value={isLoading ? 'Saving...' : 'Edit'}
                       type='submit' onClick={editingCampaign}/>

            </div>
        </div>
    );
}
FormEditing.propTypes = {
    closeForm: PropTypes.func,
    campaign: PropTypes.instanceOf(Campaign).isRequired,
    updateEditingCamp: PropTypes.func
}
FormEditing.defaultProps = {
    closeForm: () => {},
    updateEditingCamp: () => {}
}
export { FormEditing };
