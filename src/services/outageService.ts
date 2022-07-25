import config from "../config";
import axios from "axios";
import Outage from "../models/outage";
import SiteOutage from "../models/siteOutage";
import SiteInfo from "../models/siteInfo";

export default class OutageService {
    private readonly OUTAGE_ENDPOINT:string = "outages";
    private SITE_INFO_ENDPOINT:string = "site-info/:siteId";
    private SITE_OUTAGES_ENDPOINT:string = "site-outages/:siteId";
    private readonly DEFAULT_HTTP_CONFIG: object = {
        headers:{
            "x-api-key":config.apiKey
        }
    };

    constructor(){

    }


    public async getOutages() : Promise<Outage[]>{
        const apiUrl = config.apiUrl + this.OUTAGE_ENDPOINT;

        return axios.get<Outage[]>(apiUrl, this.DEFAULT_HTTP_CONFIG)
            .then(response => response.data)
            .catch(error => {
                console.error(error);
                throw new Error("Outage list could not be fetched. Api did not return a successful response.")
            });
    }

    async getSiteInfo(siteId:string): Promise<SiteInfo>{
        const apiUrl = config.apiUrl + this.SITE_INFO_ENDPOINT.replace(":siteId",siteId);
        
        return await axios.get<SiteInfo>(apiUrl, this.DEFAULT_HTTP_CONFIG)
            .then(response => response.data)
            .catch(error => {
                console.error(error);
                throw new Error("Site info could not be fetched. Api did not return a successful response.");
            });
    }

    public async sendSiteOutage(siteId:string, siteOutages:SiteOutage[]): Promise<Number> {
        const apiUrl = config.apiUrl + this.SITE_OUTAGES_ENDPOINT.replace(":siteId",siteId);
        
        return await axios.post(apiUrl, siteOutages, this.DEFAULT_HTTP_CONFIG)
            .then(response => response.status)
            .catch(error => {
                console.error(error);
                throw new Error("Site outages could not be sent. Api did not return a successful response.");
            });
    }
}