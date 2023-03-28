import axios from "axios";

import invoices from "./invoices";

export default class client {
    invoices: invoices;
    sandbox: boolean;
    instance: any;
    baseUrl: string;
    email: string;
    clientId: string;
    clientSecret: string;
    constructor(obj:any) {
        this.sandbox = obj.sandbox || null;
        this.instance = null;
        this.email = obj.email || null;
        this.clientId = obj.clientId || null;
        this.clientSecret = obj.clientSecret || null;

        if(this.email == null) throw new Error("Paypal Email Required")

        if(this.sandbox) {
            this.baseUrl = "https://api-m.sandbox.paypal.com/";
        } else {
            this.baseUrl = "https://api-m.sandbox.paypal.com/";
        }
        
        this.invoices = new invoices(this);

    }

    parseResponse(response:any) {
        if(response) return { status: response.status, data: response.data };
        else return { status: 500, data: "API error" };
    }

    loadClasses() {
        this.invoices = new invoices(this);
    }

    async auth() {
        let result;
        try {
            let res = await axios.post(this.baseUrl + 'v1/oauth2/token', {
                grant_type: 'client_credentials',
            }, {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`
                }
            })
            
            if(res.status != 200) return new Error("Paypal auth failed");
            this.instance = axios.create({
                baseURL: this.baseUrl,
                timeout: 5000,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${res.data.access_token}`
                }
            });
            
            result = res;

        } finally {
            this.loadClasses();
            return this.parseResponse(result);
        }
    }

    getSandbox() { return this.sandbox; }
    getClientId() { return this.clientId; }
    getClientSecret() { return this.clientSecret; }
    getEmail() { return this.email; }
    getBaseUrl() { return this.baseUrl; }

    setSandbox(sandbox:boolean) { this.sandbox = sandbox; }
    setClientId(clientId:string) { this.clientId = clientId; }
    setClientSecret(clientSecret:string) { this.clientSecret = clientSecret; }
    setEmail(email:string) { this.email = email; }

    /*
    async logout() {
        let response = await this.instance.post('v1/oauth2/token/terminate', {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                token: this.token, 
                token_type_hint: "ACCESS_TOKEN"
            })
        });
        return this.parseResponse(response);
    }
    */

    async getUserInfo() {
        let response = await this.instance.get('v1/identity/oauth2/userinfo').catch((err:any) => { return });
        return this.parseResponse(response);
    }

}