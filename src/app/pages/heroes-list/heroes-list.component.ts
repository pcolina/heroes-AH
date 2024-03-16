import { Component } from '@angular/core';
import { HeroUseCase } from '../../infrastucture/user-cases/hero.usercase';
import { Hero } from '../../domain/models/hero';
import { MaterialModule } from '../../shared/material/material.module';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroes-list',
  standalone: true,
  imports: [MaterialModule],
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
  public hoverState = Array(this.allHeroes.length).fill('unhoverd');


  constructor(private heroUseCase: HeroUseCase,
    private router: Router) {

    this.loadHeroes()
  }

  loadHeroes() {
    this.heroUseCase.getHeroes().subscribe(heroes => {
      this.allHeroes = heroes;
    })
  }

  openHero(id: string) {
    this.router.navigate(['/hero']);
  }

  onMouseEnter(idx: number) {
    this.hoverState[idx] = 'hovered';
  }
  onMouseLeave(idx: number) {
    this.hoverState[idx] = 'unhovered';
  }
}
