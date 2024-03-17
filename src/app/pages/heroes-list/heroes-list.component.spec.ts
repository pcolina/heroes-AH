import { ComponentFixture, TestBed } from '@angular/core/testing';
import HeroesListComponent from './heroes-list.component';
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

describe('HeroesListComponent', () => {
  let component: HeroesListComponent;
  let fixture: ComponentFixture<HeroesListComponent>;
  let heroUseCase: HeroUseCase;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroesListComponent, HttpClientTestingModule,
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule,
        RouterTestingModule,],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { id: '3' },
            },
          },
        },

      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeroesListComponent);
    component = fixture.componentInstance;
    heroUseCase = TestBed.inject(
      HeroUseCase
    );
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all heroes OK', () => {

    let spy = jest
      .spyOn(heroUseCase, 'getHeroes')
      .mockReturnValueOnce(of(HEROES_MOCK));

    component.loadHeroes();

    expect(spy).toHaveBeenCalled();
  });

  it('should try load all heroes but get an error', () => {

    let spy = jest
      .spyOn(heroUseCase, 'getHeroes')
      .mockImplementation(() => {
        return throwError(new Error('service mock error'));
      });

    component.loadHeroes();

    expect(spy).toHaveBeenCalled();
    //expect(component.loading).toBeFalsy(); //sin el setTimeOut va
  });


  it('should goes to hero detail for edit', () => {
    const id = '1';
    const navigateSpy = jest.spyOn(router, 'navigate');
    component.openHero(id);

    expect(navigateSpy).toHaveBeenCalledWith(['/hero/', id]);
  });

  it('should goes to hero detail for create', () => {
    const id = undefined;
    const navigateSpy = jest.spyOn(router, 'navigate');
    component.openHero(id);

    expect(navigateSpy).toHaveBeenCalledWith(['/hero']);
  });

  it('should search if press enter key', () => {
    const event = { key: 'Enter' };
    const spy = jest.spyOn(component, 'searchHeroes');

    component.onSearch(event);

    expect(spy).toHaveBeenCalled();
  });

  it('should search Hero', () => {
    component.allHeroes = HEROES_MOCK;
    component.searchName = 'gir';
    component.heroesList = [];

    const result = component.searchHeroes();

    expect(component.heroesList.length === 1).toBeTruthy();
  });

  it('should applies effect when mouse is over', () => {

    component.hoverState = ['unhovered', 'unhovered'];

    component.onMouseEnter(0);

    expect(component.hoverState[0] === 'hovered').toBeTruthy();
  });

  it('should applies effect when mouse leaves', () => {

    component.hoverState = ['hovered', 'hovered'];

    component.onMouseLeave(0);

    expect(component.hoverState[0] === 'unhovered').toBeTruthy();
  });
});
