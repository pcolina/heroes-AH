import { Observable } from "rxjs";
import { Hero } from "../models/hero";


export interface HeroRepository {
    getHeroes(): Observable<Hero[]>;
    getHero(id: string): Observable<Hero | null>;
    addHero(hero: Hero): Observable<boolean>;
    updateHero(hero: Hero): Observable<boolean>;
}