import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../../domain/models/hero';
import { HeroRepository } from '../../domain/repositories/hero.repository';



@Injectable({
  providedIn: 'root'
})
export class HeroServiceService {
  apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  public getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.apiUrl.concat('/heroes'));

  }

  public getHero(id: string): Observable<Hero> {
    return this.http.get<Hero>(this.apiUrl.concat(`/heroes/${id}`));

  }

  public addHero(hero: Hero): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl.concat(`/heroes`), hero);

  }

  public updateHero(hero: Hero): Observable<boolean> {
    return this.http.patch<boolean>(this.apiUrl.concat(`/heroes/${hero.id}`), hero);

  }

  public deleteHero(id: string): Observable<boolean> {
    return this.http.delete<boolean>(this.apiUrl.concat(`/heroes/${id}`));

  }


}
