
import { HeroServiceService } from './heroservice.service';
import { HeroMapper } from '../mappers/hero.mapper';
import { of, throwError } from 'rxjs';
import { Hero } from '../../domain/models/hero';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HEROES_MOCK } from '../../shared/mocks/hero.mock';

describe('HeroUseCase', () => {
  let service: HeroServiceService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HeroServiceService);
  });

  it('should get heroes successfully', (done) => {
    const mockHeroes: Hero[] = HEROES_MOCK;
    service.getHeroes().subscribe((res) => {
      expect(res).toEqual(mockHeroes);
      done()
    });

    const req = httpController.expectOne(
      `${service.apiUrl}/heroes`
    );
    req.flush(mockHeroes);
    httpController.verify();
  });

  it('should get hero  successfully', (done) => {
    const mockHero: Hero = HEROES_MOCK[0];
    service.getHero('a').subscribe((res) => {
      expect(res).toEqual(mockHero);
      done()
    });

    const req = httpController.expectOne(
      `${service.apiUrl}/heroes/a`
    );
    req.flush(mockHero);
    httpController.verify();
  });

  it('should add hero  successfully', (done) => {
    const mockHero: Hero = HEROES_MOCK[0];
    service.addHero(mockHero).subscribe((res) => {
      expect(res).toEqual(true);
      done();
    });

    const req = httpController.expectOne(
      `${service.apiUrl}/heroes`,
    );
    req.flush(true);
    httpController.verify();
  });

  it('should update hero  successfully', (done) => {
    const mockHero: Hero = HEROES_MOCK[0];
    service.updateHero(mockHero).subscribe((res) => {
      expect(res).toEqual(true);
      done();
    });

    const req = httpController.expectOne(
      `${service.apiUrl}/heroes/${mockHero.id}`,
    );
    req.flush(true);
    httpController.verify();
  });

  it('should update hero  successfully', (done) => {
    const mockHero: Hero = HEROES_MOCK[0];
    service.deleteHero(mockHero.id).subscribe((res) => {
      expect(res).toEqual(true);
      done();
    });

    const req = httpController.expectOne(
      `${service.apiUrl}/heroes/${mockHero.id}`,
    );
    req.flush(true);
    httpController.verify();
  });
});
