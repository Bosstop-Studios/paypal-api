export default class Item {
    name: string;
    description: string;
    unit_amount: any;
    unit_of_measure:string;
    quantity:string;
    discount:any;
    tax:any;
    constructor(obj:any) {

        this.name = (obj.name || null);
        this.description = obj.description || null;

        this.unit_amount = {};
        if(obj.unit_amount) {
            this.unit_amount.value = obj.unit_amount.value || null;
            this.unit_amount.currency_code = obj.unit_amount.currency_code || null;
        }

        this.unit_of_measure = obj.unit_of_measure || null;
        this.quantity = obj.quantity || null;

        this.discount = {};
        if(obj.discount) {
            this.discount.name = obj.discount.name || null;
        }
        
        this.tax = {};
        if(obj.tax) {
            this.tax.name = obj.tax.name || null;
            this.tax.percent = obj.tax.percent || null;
        }

        if(this.name == null && this.description == null) throw new Error("Item name and description cannot be null");

    }
    setName(name:string) {
        this.name = name;
    }
    setDescription(description:string) {
        this.description = description;
    }
    setPrice(price:string) {
        this.unit_amount.value = price;
    }
    setQuantity(quantity:string) {
        this.quantity = quantity;
    }
    setTaxName(taxName:string) {
        this.tax.name = taxName;
    }
    setTaxPercent(taxPercent:number) {
        this.tax.percent = taxPercent;
    }
    setDiscount(discount:string) {
        this.discount.percent = discount;
    }
}