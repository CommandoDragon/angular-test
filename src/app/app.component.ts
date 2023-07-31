import { Component, Input } from '@angular/core';
import { Groente } from './groente';
import { Winkel } from './winkel';
import { FormGroup} from '@angular/forms';
import { Bestellijn } from './bestellijn';
import { WinkelmandjeService } from './winkelmandje.service';
import { JsonPipe } from '@angular/common';
import { WinkelmandjeComponent } from './winkelmandje/winkelmandje.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  totaal: number = 0;
  winkelmandje: Bestellijn[] = [];
  winkelHasError = true;
  groenteHasError = true;
  numberHasError = false;
  numberIsZero = true;
  alInMandje = false;
  errorMsg= '';

  constructor(private _winkelmandjeservice: WinkelmandjeService){}

  bestellijnForm!: FormGroup;

  bestellijnModel = new Bestellijn(this.winkelmandje.length + 1, new Winkel('', '', 0, '', '', ''), new Groente('', 0, ''), 0);

  groenten: Array<Groente> = [
    { naam: 'aardappelen', prijs: 0.95, stuk: 'kg'},
    { naam: 'avocado', prijs: 2.69, stuk: 'stuk'},
    { naam: 'bloemkool', prijs: 1.93, stuk: 'stuk'},
    { naam: 'brocoli', prijs: 1.29, stuk: 'stuk'},
    { naam: 'champignons', prijs: 0.89, stuk: '250g'},
    { naam: 'chinese kool', prijs: 1.59, stuk: 'stuk'},
    { naam: 'groene kool', prijs: 1.69, stuk: 'stuk'},
    { naam: 'knolselder', prijs: 1.69, stuk: 'stuk'},
    { naam: 'komkommer', prijs: 2.49, stuk: 'stuk'},
    { naam: 'kropsla', prijs: 1.69, stuk: 'stuk'},
    { naam: 'paprika', prijs: 1.69, stuk: 'net'},
    { naam: 'prei', prijs: 1.69, stuk: 'stuk'},
    { naam: 'princessenbonen', prijs: 1.00, stuk: '250g'},
    { naam: 'rapen', prijs: 0.99, stuk: 'bundel'},
    { naam: 'rode kool', prijs: 1.39, stuk: 'stuk'},
    { naam: 'sla iceberg', prijs: 1.49, stuk: 'stuk'},
    { naam: 'spinazie vers', prijs: 1.89, stuk: '300g'},
    { naam: 'sjalot', prijs: 0.99, stuk: '500g'},
    { naam: 'spruiten', prijs: 1.86, stuk: 'kg'},
    { naam: 'trostomaten', prijs: 2.99, stuk: '500g'},
    { naam: 'ui', prijs: 0.89, stuk: 'kg'},
    { naam: 'witloof 1ste keus', prijs: 1.49, stuk: '700g'},
    { naam: 'wortelen', prijs: 2.59, stuk: 'kg'},
    { naam: 'courgetten', prijs: 1.50, stuk: 'stuk'}
  ]

  winkels: Array<Winkel> = [
    { naam: 'De fruitmand', adres:'Steenstraat 34', post:8000, gemeente:'Brugge', tel:'050342218', manager:'Francine Lapoule' },
    { naam: 'Jos & Anneke', adres:'Visserijstraat 1', post:8400, gemeente:'Oostende', tel:'059463689', manager:'Jos Leman' },
    { naam: 'Groene vingers', adres:'Hoogstraat 108', post:9000, gemeente:'Gent', tel:'0913422188' },
    { naam: 'De buurtwinkel',adres:'Die Laene 22', post:2000,gemeente:'Antwerpen',tel:'0230342218',manager:'Bert Simoens' }
  ]

  validateWinkel(value: string)
  {
    if(value == 'null' || value == null)
      this.winkelHasError = true;
    else
      this.winkelHasError = false;
  }

  validateGroente(value: string)
  {
    if(value == 'null' || value == null)
      this.groenteHasError = true;
    else
      this.groenteHasError = false;
  }

  validateNumber(stuk: string, value: number)
  {
    if(value > 0)
    {
      this.numberIsZero = false;
      if(stuk != 'kg')
      {
        if((value % 1) == 0)
        {
          this.numberHasError = false;
        }
        else {
          this.numberHasError = true;
        }
      }
      else
      {
        this.numberHasError = false;
      }
    }
    else {
      this.numberIsZero = true;
    }
    
    console.log(stuk);
  }

  updateWinkelmandje(): void
  {
    if(this.winkelmandje.length != 0)
    {
      for(let i = 0; i < this.winkelmandje.length; i++)
      {
        if(this.winkelmandje[i].winkel.naam == this.bestellijnModel.winkel.naam && this.winkelmandje[i].groente.naam == this.bestellijnModel.groente.naam)
        {
          this.winkelmandje[i].aantal += this.bestellijnModel.aantal;
          this.alInMandje =true;
          i = this.winkelmandje.length;
        }
      }
      if(!this.alInMandje)
      {
        this.add();
      }
      this.alInMandje = false;
    }
    else 
    {
      this.add();
    }
    this.totaal += (this.bestellijnModel.aantal * this.bestellijnModel.groente.prijs)
    this.bestellijnModel = new Bestellijn(this.winkelmandje.length + 1, new Winkel('', '', 0, '', '', ''), new Groente('', 0, ''), 0);
    this.winkelHasError = true;
    this.groenteHasError = true;

  }

  add(): void {
    this._winkelmandjeservice.addLijn({id: this.bestellijnModel.id ,winkel: this.bestellijnModel.winkel, groente: this.bestellijnModel.groente, aantal: this.bestellijnModel.aantal} as Bestellijn)
        .subscribe(lijn => { this.winkelmandje?.push(lijn);
        this.bestellijnModel = {} as Bestellijn})

        for(let i=0; i< this.winkelmandje.length; i++){
          console.log(this.winkelmandje[i]);
        }
  }
}
