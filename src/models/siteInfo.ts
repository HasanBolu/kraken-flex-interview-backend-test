import Device from "./device";

class SiteInfo {
    id:string;
    name:string;
    devices:Device[];

    constructor(init?: Partial<SiteInfo>){
        Object.assign(this, init);
    }
};

export default SiteInfo;