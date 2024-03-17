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
    return this.http.get<Hero[]>(apiUrl.concat('/heroes'));

  }

  public getHero(id: string): Observable<Hero> {
    return this.http.get<Hero>(apiUrl.concat(`/heroes/${id}`));

  }

  public addHero(hero: Hero): Observable<boolean> {
    return this.http.post<boolean>(apiUrl.concat(`/heroes`), hero);

  }

  public updateHero(hero: Hero): Observable<boolean> {
    return this.http.patch<boolean>(apiUrl.concat(`/heroes/${hero.id}`), hero);

  }

  public deleteHero(id: string): Observable<boolean> {
    return this.http.delete<boolean>(apiUrl.concat(`/heroes/${id}`));

  }


}
