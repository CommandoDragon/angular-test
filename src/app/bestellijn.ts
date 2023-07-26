import { Groente } from "./groente";
import { Winkel } from "./winkel";

export class Bestellijn {
    constructor(
        public id: number,
        public winkel: Winkel,
        public groente: Groente,
        public aantal: number
    )
    {}
}

export interface IBestellijn {
    winkel: Winkel,
    groente: Groente,
    aantal: number
}
