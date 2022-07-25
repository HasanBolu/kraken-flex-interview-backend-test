class Outage {
    id:string;
    begin:string;
    end:string;

    constructor(init?: Partial<Outage>){
        Object.assign(this, init);
    }
};

export default Outage;