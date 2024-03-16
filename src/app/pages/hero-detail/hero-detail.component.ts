import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroUseCase } from '../../infrastucture/user-cases/hero.usercase';
import { Hero } from '../../domain/models/hero';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [
    CommonModule,

  ],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HeroDetailComponent {

  public allHeroes: Hero[] | null = null
  constructor(private heroUseCase: HeroUseCase) {

    this.loadHero()
  }

  loadHero() {
    this.heroUseCase.getHeroes().subscribe(heroes => {
      this.allHeroes = heroes;
    })
  }


}
