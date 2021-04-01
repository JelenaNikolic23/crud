import React, {Component} from 'react';

import style from "./Home.module.scss";
import { Form } from "./Form/Form";
import { Table } from "./Table/Table";
import { FormEditing } from "./Form/FormEditing";
import { CampaignServices } from "../services/campaignServices";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: null,
            isFormCreate: false,
            isLoading: true,
            isFormEditing: false,
            Campaign: null
        }
        this.updateItems = this.updateItems.bind(this);
        this.openForm = this.openForm.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.removeCamp = this.removeCamp.bind(this);
        this.updateCampaign = this.updateCampaign.bind(this);
        this.openFormEditing = this.openFormEditing.bind(this);
        this.updateEditingCamp = this.updateEditingCamp.bind(this);
    }

    componentDidMount() {
        this.loadCampaign();
    }

    loadCampaign() {
        CampaignServices.fetchCampaign()
            .then(mappedItem => {
                    this.setState({
                        items: mappedItem.reverse(),
                        isLoading: false,
                })
            })
    }

    updateCampaign(newCampaign) {
        const { items } = this.state;
        this.setState({
            items: [newCampaign, ...items]
        });
    }

    updateItems(item) {
        const { items } = this.state;
        const indexOfEdited = items.findIndex((stateItem) => stateItem.id === item.id);
        const newItemsArray = [...items];
        newItemsArray.splice(indexOfEdited, 1, item);
        this.setState({
            items: newItemsArray,
        });
    }

    removeCamp(id) {
        const { items } = this.state;
        const filteredItems = items.filter(item => item.id !== id);
        this.setState({
            items: filteredItems,
        });

    }

    openForm(){
        this.setState({
            isFormCreate: true,
        });
    }

    openFormEditing(id){
            const { items } = this.state;
            const campaignEditing = items.find((item) => item.id === id)
            this.setState({
                isFormEditing: true,
                Campaign: campaignEditing
            });
    }

    updateEditingCamp(campaign) {
        const { items } = this.state;
        const indexOfupdateCamp = items.findIndex(item => item.id === campaign.id)
        const newCampArray = [...items];
        newCampArray.splice(indexOfupdateCamp,1, campaign)
        this.setState({
            items: newCampArray,
        });
    }

    closeForm(){
        this.setState({
            isFormCreate: false,
            isFormEditing: false
        });
    }

    render() {
        const { items, isLoading } = this.state;
        if (isLoading) {
            return <p>Loading...</p>
        }

        return (
            <>
                <button className={style.add} onClick={() => {this.openForm()}}> ADD </button>
                <Table updateItems={this.updateItems} removeCamp={this.removeCamp}
                       items={items}  openFormEditing={this.openFormEditing} />
                {this.state.isFormCreate ? <Form
                    closeForm={this.closeForm}
                    updateCampaign={this.updateCampaign}
                    removeCamp={this.removeCamp}
                    />
                    : null
                }
                {this.state.isFormEditing ? <FormEditing
                        closeForm={this.closeForm}
                        campaign={this.state.Campaign}
                        updateEditingCamp={this.updateEditingCamp}
                    />
                    : null
                }
            </>
        );
    }
}

export default Home;
