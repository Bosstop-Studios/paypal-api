export default class Invoice {
    details: any;
    invoicer: any;
    primary_recipients: any;
    items: any;
    configuration: any;
    constructor(obj: any) {

        this.details = {};
        this.details.currency_code = "USD";
        this.details.payment_term = { term_type: "NET_10" };
        this.details.invoice_date = new Date().toISOString().split("T")[0];
        this.details.terms_and_conditions = obj.terms_and_conditions || null;
        this.details.memo = obj.memo || null;
        this.details.note = obj.note || null;

        this.invoicer = {};
        this.invoicer.bussiness_name = obj.bussiness_name || null;
        this.invoicer.website = obj.website || null;
        this.invoicer.email_address = obj.email_address || null;
        this.invoicer.logo_url = obj.logo_url || null;

        this.primary_recipients = [];

        this.items = [];

        this.configuration = {};
        this.configuration.partial_payment.allow_partial_payment = obj.allow_partial_payment || true;
        this.configuration.partial_payment.minimum_amount_due.currency_code = obj.currency_code || "USD";
        this.configuration.partial_payment.minimum_amount_due.value = obj.minimum_amount_due.value || 0;
        this.configuration.tax_calculated_after_discount = obj.tax_calculated_after_discount || false;
        this.configuration.tax_inclusive = obj.tax_inclusive || false;
        this.configuration.allow_tip = obj.allow_tip || false;

    }

    setInvoiceNumber(invoice_number: number) {
        this.details.invoice_number = invoice_number;
    }

    setDetails(obj: any) {

        this.details = {};
        this.details.invoice_number = obj.invoice_number || null;
        this.details.currency_code = obj.currency_code || "USD";
        this.details.payment_term = { term_type: "NET_10" };
        this.details.invoice_date = new Date().toISOString().split("T")[0];
        this.details.terms_and_conditions = obj.terms_and_conditions || null;
        this.details.memo = obj.memo || null;
        this.details.note = obj.note || null;
    }

    setInvoicer(obj: any) {

        this.invoicer = {};
        this.invoicer.bussiness_name = obj.bussiness_name || null;
        this.invoicer.website = obj.website || null;
        this.invoicer.email_address = obj.email_address || null;
        this.invoicer.logo_url = obj.logo_url || null;
    }

    addPrimaryRecipient(obj: any) {
        this.primary_recipients.push({
            email_address: obj.email || null,
            first_name: obj.first_name || null,
            last_name: obj.last_name || null,
            language: obj.language || null,
            business_name: obj.business_name || null,
            shipping_address: {
                line1: obj.line1 || null,
                line2: obj.line2 || null,
                city: obj.city || null,
                state: obj.state || null,
                postal_code: obj.postal_code || null,
                country_code: obj.country_code || null,
            },
        });
    }

    removePrimaryRecipient(index: number) {
        this.primary_recipients.splice(index, 1);
    }

    addItem(obj: any) {
        this.items.push({
            name: obj.name || null,
            description: obj.description || null,
            quantity: obj.quantity || null,
            unit_amount: {
                currency_code: obj.currency_code || "USD",
                value: obj.value || 0,
            },
            tax: {
                name: obj.tax_name || null,
                percent: obj.tax_percent || 0,
            },
            discount: {
                percent: obj.discount_percent || 0,
            },
        });
    }

    removeItem(index: number) {
        this.items.splice(index, 1);
    }
    
}