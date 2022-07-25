import OutageService from "../services/outageService";
import Outage from "../models/outage";
import SiteInfo from "../models/siteInfo";
import SiteOutage from "../models/siteOutage";
import Device from "../models/device";

export default class InformOutageHandler {
    outageService: OutageService;

    constructor(){
        this.outageService = new OutageService();
    }

    public async informSiteOutage(siteId:string, outageMinimumBeginDate:Date):Promise<boolean>{
        const siteInfo:SiteInfo = await this.outageService.getSiteInfo(siteId);
        if(siteInfo == null){
            console.log("API did not return site info.");
            return;
        }
        
        const outages:Outage[] = await this.outageService.getOutages();
        if(outages == null || outages.length == 0){
            console.log("API did not return any outage.");
            return;
        }

    
        let siteOutages : SiteOutage[] = []; 
        outages.forEach(outage => {
            const doesOutageExist: Boolean = new Date(outage.begin) >= outageMinimumBeginDate && siteInfo.devices.some(device => device.id === outage.id);
            if(doesOutageExist){
                const device:Device = siteInfo.devices.find(d => d.id == outage.id);
                const siteOutage:SiteOutage = { name: device.name, ...outage }
                siteOutages.push(siteOutage); 
            }
        });

        if(siteOutages.length == 0){
            console.info("There is no site outage to be informed.");
            return;
        }
        
        const statusCode: Number = await this.outageService.sendSiteOutage(siteId, siteOutages)
    
        if(statusCode === 200){
            console.log("site outages have been sent successfully");
        }
    };
}