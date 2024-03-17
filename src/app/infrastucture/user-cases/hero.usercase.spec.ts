
import { HeroServiceService } from '../services/heroservice.service';
import { HeroMapper } from '../mappers/hero.mapper';
import { of, throwError } from 'rxjs';
import { Hero } from '../../domain/models/hero';
import { HeroUseCase } from './hero.usercase';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HEROES_MOCK } from '../../shared/mocks/hero.mock';

describe('HeroUseCase', () => {
  let heroUseCase: HeroUseCase;
  let heroeService: jest.Mocked<HeroServiceService>;

  beforeEach(() => {
    heroeService = {
      getHeroes: jest.fn(),
      getHero: jest.fn(),
      addHero: jest.fn(),
      updateHero: jest.fn(),
      deleteHero: jest.fn()
    } as unknown as jest.Mocked<HeroServiceService>;
    heroUseCase = new HeroUseCase(heroeService);
  });

  it('should create', () => {
    expect(heroUseCase).toBeTruthy();
  });

  it('should get heroes successfully', async () => {
    const mockHeroes: Hero[] = HEROES_MOCK;
    heroeService.getHeroes.mockReturnValueOnce(of(mockHeroes));

    const heroes$ = heroUseCase.getHeroes();

    const heroes = await heroes$.toPromise();

    expect(heroes).toEqual(mockHeroes);

  });

  it('should get heroes NOT successfully', async () => {
    const errorMessage = 'Error fetching heroes';
    heroeService.getHeroes.mockReturnValueOnce(throwError(errorMessage));

    heroUseCase.getHeroes().subscribe(heroes => {
      expect(heroes).toEqual([]);
    });

  });

  it('should get one hero by Id successfully', async () => {
    const mockHero: Hero = HEROES_MOCK[0];
    heroeService.getHero.mockReturnValueOnce(of(mockHero));

    const hero$ = heroUseCase.getHero(mockHero.id);

    const hero = await hero$.toPromise();

    expect(hero).toEqual(mockHero);

  });

  it('should get hero NOT successfully', async () => {
    const errorMessage = 'Error fetching heroes';
    heroeService.getHero.mockReturnValueOnce(throwError(errorMessage));

    heroUseCase.getHero('1').subscribe(heroes => {
      expect(heroes).toEqual([]);
    });

  });



  it('should add one hero by Id  successfully', async () => {
    const mockHero: Hero = HEROES_MOCK[0];
    heroeService.addHero.mockReturnValueOnce(of(true));

    const hero$ = heroUseCase.addHero(mockHero);

    const hero = await hero$.toPromise();

    expect(hero).toBeTruthy();

  });

  it('should add one hero NOT successfully', async () => {
    const errorMessage = 'Error fetching heroes';
    heroeService.addHero.mockReturnValueOnce(throwError(errorMessage));

    heroUseCase.addHero(HEROES_MOCK[0]).subscribe(heroes => {
      expect(heroes).toEqual([]);
    });
  });

  it('should update one hero by Id  successfully', async () => {
    const mockHero: Hero = HEROES_MOCK[0];
    heroeService.updateHero.mockReturnValueOnce(of(true));

    const hero$ = heroUseCase.updateHero(mockHero);

    const hero = await hero$.toPromise();

    expect(hero).toBeTruthy();

  });

  it('should update one hero NOT successfully', async () => {
    const errorMessage = 'Error fetching heroes';
    heroeService.updateHero.mockReturnValueOnce(throwError(errorMessage));

    heroUseCase.updateHero(HEROES_MOCK[0]).subscribe(heroes => {
      expect(heroes).toEqual([]);
    });
  });

  it('should delete one hero by Id  successfully', async () => {
    const mockHero: Hero = HEROES_MOCK[0];
    heroeService.deleteHero.mockReturnValueOnce(of(true));

    const hero$ = heroUseCase.deleteHero(mockHero.id);

    const hero = await hero$.toPromise();

    expect(hero).toBeTruthy();

  });

  it('should delete one hero NOT successfully', async () => {
    const errorMessage = 'Error fetching heroes';
    heroeService.deleteHero.mockReturnValueOnce(throwError(errorMessage));

    heroUseCase.deleteHero(HEROES_MOCK[0].id).subscribe(heroes => {
      expect(heroes).toEqual([]);
    });
  });
});
