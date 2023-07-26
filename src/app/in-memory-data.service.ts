import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Bestellijn } from './bestellijn';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  constructor() { }

  createDb(){
    const winkelmandje: Bestellijn[] = [];
    return {winkelmandje}
  }
}
