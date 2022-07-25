import Outage from "../src/models/outage";
import SiteInfo from "../src/models/siteInfo";
import Device from "../src/models/device";
import SiteOutage from "../src/models/siteOutage";

import OutageService from "../src/services/outageService";
import InformOutageHandler from "../src/handlers/informOutageHandler";


const siteId: string = "norwich-pear-tree";
const outageMinimumBeginDate: string = "2022-01-01T00:00:00.000Z";

const beforeMinimumBeginDate: string = "2021-01-01T00:00:00.000Z";
const afterMinimumBeginDate: string = "2022-04-01T00:00:00.000Z";
const sampleEndDate: string = "2022-08-01T00:00:00.000Z";

const outage1 = new Outage({id:"1", begin:beforeMinimumBeginDate, end:sampleEndDate });
const outage2 = new Outage({id:"2", begin:afterMinimumBeginDate, end:sampleEndDate });
const outage3 = new Outage({id:"3", begin:afterMinimumBeginDate, end:sampleEndDate });

const siteInfo = new SiteInfo({
    id: "norwich-pear-tree", 
    name:"norwich-pear-tree", 
    devices: [
        new Device({id:"1", name:"Device 1"}),
        new Device({id:"2", name:"Device 2"}) 
    ] 
});

describe("InformOutageHandler", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    it("Site outages should be informed", async () => {        
        let informOutageHandler = new InformOutageHandler();

        let getSiteInfoMock = jest.spyOn(OutageService.prototype, "getSiteInfo")
                                .mockImplementation(async (siteId:string) => Promise.resolve(siteInfo));
        let getOutagesMock = jest.spyOn(OutageService.prototype, "getOutages")
                                .mockImplementation(async () => Promise.resolve([outage1, outage2, outage3]));
        let sendSiteOutagesMock = jest.spyOn(OutageService.prototype, "sendSiteOutage")
                                .mockImplementation(async (siteId:string, siteOutages:SiteOutage[]) => Promise.resolve(200));

        await informOutageHandler.informSiteOutage(siteId, new Date(outageMinimumBeginDate))

        expect(getSiteInfoMock).toHaveBeenCalledTimes(1);
        expect(getOutagesMock).toHaveBeenCalledTimes(1);
        expect(sendSiteOutagesMock).toHaveBeenCalledTimes(1);
            
        const siteOutages: SiteOutage[] = [
            {
                name:"Device 2", 
                ...outage2
            }
        ];
    
        expect(sendSiteOutagesMock).toHaveBeenCalledWith(siteId, siteOutages);
    })
    

    it("Site outages should not be informed if API did not return site info", async () => {
        let informOutageHandler = new InformOutageHandler();

        let getSiteInfoMock = jest.spyOn(OutageService.prototype, "getSiteInfo")
                                .mockImplementation(async (siteId:string) => Promise.resolve(null));
        let getOutagesMock = jest.spyOn(OutageService.prototype, "getOutages")
                                .mockImplementation(async () => Promise.resolve(null));
        let sendSiteOutagesMock = jest.spyOn(OutageService.prototype, "sendSiteOutage")
                                .mockImplementation(async (siteId:string, siteOutages:SiteOutage[]) => Promise.resolve(200));

        await informOutageHandler.informSiteOutage(siteId, new Date(outageMinimumBeginDate))

        expect(getSiteInfoMock).toHaveBeenCalledTimes(1);
        expect(getOutagesMock).toHaveBeenCalledTimes(0);
        expect(sendSiteOutagesMock).toHaveBeenCalledTimes(0);
    })

    it("Site outages should not be informed if there is no outage", async () => {
        let informOutageHandler = new InformOutageHandler();

        let getSiteInfoMock = jest.spyOn(OutageService.prototype, "getSiteInfo")
                                .mockImplementation(async (siteId:string) => Promise.resolve(siteInfo));
        let getOutagesMock = jest.spyOn(OutageService.prototype, "getOutages")
                                .mockImplementation(async () => Promise.resolve(null));
        let sendSiteOutagesMock = jest.spyOn(OutageService.prototype, "sendSiteOutage")
                                .mockImplementation(async (siteId:string, siteOutages:SiteOutage[]) => Promise.resolve(200));

        await informOutageHandler.informSiteOutage(siteId, new Date(outageMinimumBeginDate))

        expect(getSiteInfoMock).toHaveBeenCalledTimes(1);
        expect(getOutagesMock).toHaveBeenCalledTimes(1);
        expect(sendSiteOutagesMock).toHaveBeenCalledTimes(0);
    })

    it("Site outages should not be informed if there is no site outage", async () => {
        let informOutageHandler = new InformOutageHandler();

        let getSiteInfoMock = jest.spyOn(OutageService.prototype, "getSiteInfo")
                                .mockImplementation(async (siteId:string) => Promise.resolve(siteInfo));
        let getOutagesMock = jest.spyOn(OutageService.prototype, "getOutages")
                                .mockImplementation(async () => Promise.resolve([outage1, outage3, outage3]));
        let sendSiteOutagesMock = jest.spyOn(OutageService.prototype, "sendSiteOutage")
                                .mockImplementation(async (siteId:string, siteOutages:SiteOutage[]) => Promise.resolve(200));

        await informOutageHandler.informSiteOutage(siteId, new Date(outageMinimumBeginDate))

        expect(getSiteInfoMock).toHaveBeenCalledTimes(1);
        expect(getOutagesMock).toHaveBeenCalledTimes(1);
        expect(sendSiteOutagesMock).toHaveBeenCalledTimes(0);
    })
})