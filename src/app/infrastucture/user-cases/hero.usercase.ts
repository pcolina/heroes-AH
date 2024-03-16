import { Inject, Injectable } from "@angular/core";

import { Observable, catchError, map, of } from "rxjs";

import { HeroRepository } from "../../domain/repositories/hero.repository";
import { Hero } from "../../domain/models/hero";
import { HeroMapper } from "../mappers/hero.mapper";
import { HeroServiceService } from "../services/hero.service.ts.service";

@Injectable({
    providedIn: 'root'
})
export class HeroUseCase implements HeroRepository {
    constructor(private heroService: HeroServiceService) { }

    getHeroes(): Observable<Hero[]> {
        return this.heroService.getHeroes().pipe(
            map(result => {
                const myHero = result.map(heroDTO => HeroMapper.fromApiToDomain(heroDTO));
                return myHero;
            }),
            catchError(error => {
                console.error('Error fetching heroes:', error);
                return of([]);
            })
        );
    }

    getHero(id: string): Observable<Hero | null> {
        return this.heroService.getHero(id).pipe(
            map(heroDTO => {
                return HeroMapper.fromApiToDomain(heroDTO);

            }),
            catchError(error => {
                console.error('Error fetching hero with id: '.concat(id), error);
                return of(null);
            })
        );
    }

    addHero(hero: Hero): Observable<boolean> {
        const newHeroDTO = HeroMapper.fromDomainToApi(hero);
        return this.heroService.addHero(newHeroDTO);
    }

    updateHero(hero: Hero): Observable<boolean> {
        const newHeroDTO = HeroMapper.fromDomainToApi(hero);
        return this.heroService.updateHero(hero);
    }
}
