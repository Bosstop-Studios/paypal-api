export default class Item {
    name: string;
    description: string;
    unit_amount: { currency_code: string; value: string; };
    unit_of_measure:string;
    quantity:string;
    discount:any;
    tax:any;
    constructor(name:string, description:string, price:string, discount:any, tax:any) {
        this.name = name;
        this.description = description ;
        this.quantity = "1";
        this.unit_of_measure = "QUANTITY";
        this.unit_amount = {
            currency_code: "USD",
            value: price || "0.00"
        }
        this.tax = {
            name: tax.name || null,
            percent: tax.percent || 0,
        } 
        this.discount = {
            percent: discount || "0",
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