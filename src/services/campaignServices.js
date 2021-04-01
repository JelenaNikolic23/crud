import Campaign from "../entities/Campaign";

const BASE_URL = 'http://localhost:3333/api/campaigns';

export class CampaignServices {
    static fetchCampaign() {
        return fetch(BASE_URL)
            .then(res => res.json())
            .then(results => results.map(campaign => new Campaign(campaign)))
    }

    static saveCampaign(campaign) {
        const headers = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(campaign),
        };
        return fetch(`${BASE_URL}`, headers)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Greska')
                } else {
                    return res.json()
                }
            })
            .then(c => new Campaign(c));
    }

    static editCampaign(id, payload) {
        const headers = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
        };
        return fetch(`${BASE_URL}/${id}`, headers)
            .then(res => res.json())
            .then(campaign => new Campaign(campaign));
    }

    static deleteCampaign(id){
        const config = {
            method: 'DELETE'
        };
        return fetch(`${BASE_URL}/${id}`, config)
            .then(res => res.json())
    }
}
