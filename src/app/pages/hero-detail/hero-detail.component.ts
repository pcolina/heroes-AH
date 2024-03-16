import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>hero-detail works!</p>`,
  styleUrl: './hero-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HeroDetailComponent { }
