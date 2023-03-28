
export default class invoices {
    instance: any;
    parseResponse: any;
    constructor(client:any) {
        this.parseResponse = client.parseResponse;
        this.instance = client.instance;
    }

    async getInvoices() {
        let res = await this.instance.get('/v2/invoicing/invoices');
        return this.parseResponse(res);
    }

    async getInvoice(invoiceId:string) {
        let res = await this.instance.get(`/v2/invoicing/invoices/${invoiceId}`);
        return this.parseResponse(res);
    }

    async generateInvoiceInt(): Promise<number> {
        let response = await this.instance.post('v2/invoicing/generate-next-invoice-number');
        return response.data.invoice_number;
    }

    async createInvoice(invoice:any) {
        let res = await this.instance.post('/v2/invoicing/invoices', invoice);
        return this.parseResponse(res);
    }
    
    async sendInvoice(url:string) {
        let response = await this.instance.post(`${url}/send`, {
            "send_to_invoicer": true,
        });
        return this.parseResponse(response);
    }

    async deleteInvoice() {
        let response = await this.instance.delete();
        return this.parseResponse(response);
    }

    async deleteAllInvoices() {
        let invoiceID: any[] = []
        let response = await this.instance.get("v2/invoicing/invoices");
        let invoices = response.data.items;
        if(!invoices) return;
        if(invoices.length == 0) return;
        invoices.forEach(async (invoice:any) => {
            invoiceID.push(invoice.id);
            await this.instance.delete(`v2/invoicing/invoices/${invoice.id}`);
        });
        return invoiceID;
    }

}
