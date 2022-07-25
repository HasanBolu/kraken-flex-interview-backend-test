class Device {
    id:string;
    name:string;

    constructor(init?: Partial<Device>){
        Object.assign(this, init);
    }
}

export default Device;