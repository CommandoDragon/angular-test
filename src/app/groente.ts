export class Groente {
    public naam: string;
    public prijs!: number;
    public stuk!: string;

    constructor(naam: string, prijs: number, stuk: string){
        this.naam = naam;
        this.prijs = prijs;
        this.stuk = stuk;
    }
}
