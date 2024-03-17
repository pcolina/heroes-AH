import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeroUseCase } from '../../infrastucture/user-cases/hero.usercase';
import { HEROES_MOCK } from '../../shared/mocks/hero.mock';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import HeroDetailComponent from './hero-detail.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let heroUseCase: HeroUseCase;
  let router: Router;
  let toastrService: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        ToastrModule.forRoot()],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {

            params: of({ id: '3' }),

          },
        },

      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    heroUseCase = TestBed.inject(
      HeroUseCase
    );
    router = TestBed.inject(Router);
    toastrService = TestBed.inject(ToastrService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load one heroes as edition', () => {

    let spy = jest
      .spyOn(component, 'getHero');

    component.loadHero();

    expect(spy).toHaveBeenCalled();
    expect(component.isEdition).toBeTruthy();
  });


  // it('should load one hero as creation', () => {

  //   TestBed.overrideProvider(ActivatedRoute, {
  //     useValue: {
  //       params: of({}) // Simula que no hay parámetros de ruta
  //     }
  //   });

  //   const fixture = TestBed.createComponent(HeroDetailComponent);
  //   const component = fixture.componentInstance;

  //   let spy = jest
  //     .spyOn(component, 'getHero');

  //   component.loadHero();

  //   expect(spy).toHaveBeenCalled();
  //   expect(component.isEdition).toBeFalsy();
  // });

  it('should get one hero', () => {

    let spy = jest
      .spyOn(heroUseCase, 'getHero').mockReturnValueOnce(of(HEROES_MOCK[0]));

    component.loadHero();

    expect(spy).toHaveBeenCalled();;
  });


  it('should save one hero in edition mode', () => {
    component.isEdition = true;
    const toastrSpy = jest.spyOn(toastrService, 'success');

    let spy = jest
      .spyOn(heroUseCase, 'updateHero').mockReturnValueOnce(of(true));

    component.saveHeroDetail();

    expect(spy).toHaveBeenCalled();;
    expect(toastrSpy).toHaveBeenCalled();;
  });

  it('should save one hero in edition mode but get an error', () => {
    component.isEdition = true;
    const toastrSpy = jest.spyOn(toastrService, 'warning');

    let spy = jest
      .spyOn(heroUseCase, 'updateHero').mockImplementation(() => {
        return throwError(new Error('service mock error'));
      });

    component.saveHeroDetail();

    expect(spy).toHaveBeenCalled();
    expect(toastrSpy).toHaveBeenCalled();
  });


  it('should save one hero in creation mode', () => {
    component.isEdition = false;
    const toastrSpy = jest.spyOn(toastrService, 'success');

    let spy = jest
      .spyOn(heroUseCase, 'addHero').mockReturnValueOnce(of(true));

    component.saveHeroDetail();

    expect(spy).toHaveBeenCalled();
    expect(toastrSpy).toHaveBeenCalled();
  });

  it('should save one hero in creation mode', () => {
    component.isEdition = false;
    const toastrSpy = jest.spyOn(toastrService, 'warning');

    let spy = jest
      .spyOn(heroUseCase, 'addHero').mockImplementation(() => {
        return throwError(new Error('service mock error'));
      });

    component.saveHeroDetail();

    expect(spy).toHaveBeenCalled();
    expect(toastrSpy).toHaveBeenCalled();
  });



  it('should delete one hero ', () => {
    component.isEdition = false;
    component.selectedHero = HEROES_MOCK[0];
    const toastrSpy = jest.spyOn(toastrService, 'success');

    let spy = jest
      .spyOn(heroUseCase, 'deleteHero').mockReturnValueOnce(of(true));

    component.deleteHeroDetail();

    expect(spy).toHaveBeenCalled();
    expect(toastrSpy).toHaveBeenCalled();
  });

  it('should delete one hero but get an error', () => {
    component.isEdition = false;
    component.selectedHero = HEROES_MOCK[0];
    const toastrSpy = jest.spyOn(toastrService, 'warning');

    let spy = jest
      .spyOn(heroUseCase, 'deleteHero').mockImplementation(() => {
        return throwError(new Error('service mock error'));
      });

    component.deleteHeroDetail();

    expect(spy).toHaveBeenCalled();
    expect(toastrSpy).toHaveBeenCalled();
  });

  it('should create', () => {
    component.selectedHero = HEROES_MOCK[0]
    component.fillForm();

    expect(component.superheroForm.controls['superhero'].value !== undefined).toBeTruthy();
    expect(component.superheroForm.controls['publisher'].value !== undefined).toBeTruthy();
    expect(component.superheroForm.controls['alterEgo'].value !== undefined).toBeTruthy();
  });

});

