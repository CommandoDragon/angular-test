import { Component, Input, OnInit } from '@angular/core';
import { Bestellijn, IBestellijn } from '../bestellijn';
import { WinkelmandjeService } from '../winkelmandje.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-winkelmandje',
  templateUrl: './winkelmandje.component.html',
  styleUrls: ['./winkelmandje.component.css']
})
export class WinkelmandjeComponent {
  
  @Input() totaal!: number;
  @Input() winkelmandje!: Bestellijn[];

  inUSD: boolean = false;
  factor: number = 1.108251;

  currency: string = 'EUR';
  btnText: string = 'USD';

  constructor(public _service: WinkelmandjeService)
  {

  }

  convertCurrency()
  {
    
    if(!this.inUSD)
    {
      for(let i=0; i < this.winkelmandje.length; i++)
      {
        this.winkelmandje[i].groente.prijs *= this.factor;
      }

      this.totaal*= this.factor;
      this.currency='USD';
      this.btnText='EUR';
      this.inUSD = true;
    }
    else
    {
      for(let i=0; i < this.winkelmandje.length; i++)
      {
        this.winkelmandje[i].groente.prijs /= this.factor;
      }

      this.totaal/= this.factor;
      this.currency='EUR';
      this.btnText='USD';
      this.inUSD = false;
    }
    console.log(this.inUSD)
  }

}
