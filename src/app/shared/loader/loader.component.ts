import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `@if(isLoading()) {<div class="loader-overlay">
  --<div class="loader"></div>--
</div>}`,
  styleUrl: './loader.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {

  isLoading = input.required<boolean>();

}
