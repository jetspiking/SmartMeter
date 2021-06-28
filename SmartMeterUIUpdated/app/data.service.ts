import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Data } from './data'

@Injectable({
  providedIn: 'root'
})
export class Dataservice
{
  constructor(private httpClient: HttpClient) {};

  getAllPosts(): Observable<Data[]> {
    return this.httpClient.get<Data[]>('http://localhost:3000/all');
  }

  getLastPosts(): Observable<Data> {
    return this.httpClient.get<Data>('http://localhost:3000/last');
  }

  getHourPosts(): Observable<Data[]> {
    return this.httpClient.get<Data[]>('http://localhost:3000/hour');
  }

  getDayPosts(): Observable<Data[]> {
    return this.httpClient.get<Data[]>('http://localhost:3000/day');
  }
}