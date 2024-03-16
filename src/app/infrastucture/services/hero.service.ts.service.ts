import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../../domain/models/hero';
import { HeroRepository } from '../../domain/repositories/hero.repository';

const apiUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class HeroServiceService {

  constructor(private http: HttpClient) { }

  public getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(apiUrl + '/heroes');

  }

  public getHero(id: string): Observable<Hero> {
    return this.http.get<Hero>(apiUrl);

  }

  public addHero(hero: Hero): Observable<boolean> {
    return this.http.put<boolean>(apiUrl, hero);

  }

  public updateHero(hero: Hero): Observable<boolean> {
    return this.http.patch<boolean>(apiUrl, hero);

  }



}
