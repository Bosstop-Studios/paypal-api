import client from "./client";

export default class invoices extends client {
    constructor(obj:any) {
        super(obj);
    }

    async getInvoices() {
        let res = await this.instance.get('/v2/invoicing/invoices');
        return this.parseResponse(res);
    }
}