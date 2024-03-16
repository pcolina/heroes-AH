import { Component, EventEmitter, Output, input, signal } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { HEROES_LIST, NEW_HERO } from '../../common/texts/webText';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MaterialModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  isSidebarOpen = input.required<boolean>();
  @Output() optionSelected = new EventEmitter<boolean>();

  public heroesList = HEROES_LIST;
  public newHero = NEW_HERO;

  constructor() {


  }

  changeIsSidebarOpen() {
    this.optionSelected.emit(true)

  }
}
