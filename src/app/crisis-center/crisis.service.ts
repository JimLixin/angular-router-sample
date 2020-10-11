import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators';

import { Crisis } from './crisis';
import { CRISES } from './mock-crises';
import { MessageService } from '../message.service';

@Injectable({
  providedIn: 'root'
})
export class CrisisService {
  private crisisUrl = 'api/crisises';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private log(message: string) {
    this.messageService.add(`CrisisService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getCrises(): Observable<Crisis[]>{
    return of(CRISES);
  }

  getCrisis(id: number): Observable<Crisis> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`CrisisService: fetched crisis id=${id}`);
    return of(CRISES.find(crisis => crisis.id === id));
  }
}
