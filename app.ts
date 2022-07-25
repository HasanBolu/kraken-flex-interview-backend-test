import InformOutageHandler from "./src/handlers/informOutageHandler"

const siteId: string = "norwich-pear-tree";
const outageMinimumBeginDate: Date = new Date("2022-01-01T00:00:00.000Z");
const informOutageHandler:InformOutageHandler = new InformOutageHandler();

// Outage API can return 500 status code occasionally. 
// The following function tries to inform site outages with a try limit.
const informSiteOutage = async () => {
    let tryCount:number = 5;
    while(tryCount > 0){
        try{
            await informOutageHandler.informSiteOutage(siteId, outageMinimumBeginDate)
            break;
        } catch(error){
            if(--tryCount == 0){
                console.log(error);
            }
        }
    }
}

informSiteOutage();