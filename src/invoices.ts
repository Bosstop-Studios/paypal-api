import client from './client';

export default class invoices extends client {
    parseResponse: any;
    invoicer: any;

    constructor(obj:any) {
        super(obj);

        this.instance = obj.instance;
        this.parseResponse = obj.parseResponse;

        this.invoicer = {
            name: obj.user.bussiness_name,
            email: obj.email,
            website: obj.user.website,
        }
    }

    async getInvoices() {
        let res = await this.instance.get('/v2/invoicing/invoices');
        return this.parseResponse(res);
    }

    async getInvoice(invoiceId:string):Promise<any> {
        let res = await this.instance.get(`/v2/invoicing/invoices/${invoiceId}`);
        return this.parseResponse(res);
    }

    async generateInvoiceInt():Promise<number> {
        let response = await this.instance.post('v2/invoicing/generate-next-invoice-number');
        return response.data.invoice_number;
    }

    async createInvoice(invoice:any):Promise<any> {
        let invoiceNumber = await this.generateInvoiceInt();
        invoice.setInvoiceNumber(invoiceNumber);
        invoice.setInvoicer(this.invoicer)
        let res = await this.instance.post('/v2/invoicing/invoices', invoice);
        return this.parseResponse(res);
    }
    
    async sendInvoice(url:string):Promise<any> {
        let response = await this.instance.post(`${url}/send`, {
            "send_to_invoicer": true,
        });
        return this.parseResponse(response);
    }

    async deleteInvoice(id:string):Promise<any> {
        let response = await this.instance.delete(`v2/invoicing/invoices/${id}`);
        return this.parseResponse(response);
    }

    async deleteAllInvoices():Promise<any> {
        let invoiceID: any[] = []
        let invoices = await this.getInvoices();
        if(!invoices) return false;
        if(invoices.length > 0) return false;
        invoices.forEach(async(invoice:any) => {
            invoiceID.push(invoice.id);
            await this.instance.delete(`v2/invoicing/invoices/${invoice.id}`);
        });
        return invoiceID;
    }

}
