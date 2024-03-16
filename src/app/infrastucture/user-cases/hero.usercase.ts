import { Inject, Injectable } from "@angular/core";

import { Observable, catchError, map, of } from "rxjs";

import { HeroRepository } from "../../domain/repositories/hero.repository";
import { Hero } from "../../domain/models/hero";
import { HeroMapper } from "../mappers/hero.mapper";

@Injectable({
    providedIn: 'root'
})
export class HeroUseCase {
    constructor(@Inject('HeroRepository') private heroRepository: HeroRepository) { }

    getHeroes(): Observable<Hero[]> {
        return this.heroRepository.getHeroes().pipe(
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
        return this.heroRepository.getHero(id).pipe(
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
        return this.heroRepository.addHero(newHeroDTO);
    }

    updateHero(hero: Hero): Observable<boolean> {
        const newHeroDTO = HeroMapper.fromDomainToApi(hero);
        return this.heroRepository.updateHero(hero);
    }
}
