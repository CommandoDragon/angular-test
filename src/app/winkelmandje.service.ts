import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Bestellijn, IBestellijn } from './bestellijn';
import { Observable, map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WinkelmandjeService {

  constructor(private http: HttpClient){}

  private winkelmandjeUrl = 'api/winkelmandje';

  getBestellijnen(): Observable<Bestellijn[]> {
    return this.http.get<Bestellijn[]>(this.winkelmandjeUrl).pipe(catchError(this.handleError('getBestellijnen', [])))
  }

  handleError<T>(operation = 'operation', result?:T) {
    return (error: any): Observable<T> => {
      console.log(operation, error);
      return of(result as T);
    }
  }

  addLijn(bestellijn: Bestellijn): Observable<Bestellijn> {
    //return this.http.post<Bestellijn>(this.winkelmandjeUrl, bestellijn, httpOptions).pipe(catchError(this.handleError<Bestellijn>('addLijn')))
    return this.http.post<Bestellijn>(this.winkelmandjeUrl, bestellijn)
  }

  /*_url = 'http://localhost:3000/bestel';


  bestel(bestellijn: Bestellijn)
  {
    return this._http.post<Bestellijn>(this._url, bestellijn)
  }

  getBestellijnen(): Observable<IBestellijn[]> {
    return this._http.get<Bestellijn[]>(this._url);
    
  }*/
}
