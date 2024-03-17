import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { HeroUseCase } from '../../infrastucture/user-cases/hero.usercase';
import { Hero } from '../../domain/models/hero';
import { MaterialModule } from '../../shared/material/material.module';
import { TitleCasePipe } from '@angular/common';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-heroes-list',
  standalone: true,
  imports: [MaterialModule, FormsModule, TitleCasePipe, LoaderComponent],
  templateUrl: './heroes-list.component.html',
  styleUrl: './heroes-list.component.scss',
  animations: [
    trigger('hoverAnimation', [
      state('hovered', style({
        transform: 'scale(1.1)',
      })),
      state('notHovered', style({
        transform: 'scale(1)',
      })),
      transition('notHovered <=> hovered', animate('200ms ease-in-out')),
    ]),
  ],
})
export default class HeroesListComponent {

  public allHeroes: Hero[] | [] = [];
  public heroesList: Hero[] | [] = [];
  public hoverState = Array(this.allHeroes.length).fill('unhoverd');

  public searchName = '';
  public loading = true;

  constructor(private heroUseCase: HeroUseCase,
    private router: Router) {

    this.loadHeroes()
  }

  loadHeroes() {
    this.loading = true;
    this.heroUseCase.getHeroes().subscribe(heroes => {
      this.allHeroes = heroes;
      this.heroesList = heroes;


    }, (error) => { },
      () => {
        // si no no se ve el loading ;)
        setTimeout(() => {
          this.loading = false;
        }, 2000);
      });
  }

  openHero(id: string | undefined = undefined) {
    if (!id) {
      this.router.navigate(['/hero']);
    } else {

      this.router.navigate(['/hero/', id]);
    }
  }

  onSearch(event: any) {
    if (event.key === 'Enter')
      this.searchHeroes();
  }

  searchHeroes() {
    this.heroesList = this.allHeroes.filter(hero => hero.superhero.toLocaleLowerCase().includes(this.searchName.toLocaleLowerCase()))

  }

  onMouseEnter(idx: number) {
    this.hoverState[idx] = 'hovered';
  }
  onMouseLeave(idx: number) {
    this.hoverState[idx] = 'unhovered';
  }


}
