export class Winkel {
    public naam!: string;
    public adres!: string;
    public post!: number;
    public gemeente!: string;
    public tel!: string;
    public manager?: string;

    constructor(naam: string, adres:string, post: number, gemeente: string, tel: string, manager: string)
    {
        this.naam = naam;
        this.adres = adres;
        this.post = post;
        this.gemeente = gemeente;
        this.tel = tel;
        this.manager = manager;
    }
}
