import { SidebarComponent } from './../sidebar/sidebar.component';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { MediaMatcher } from '@angular/cdk/layout';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule, SidebarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  isSidebarOpen = false;


  optionSelected() {
    this.isSidebarOpen = false;
  }

}
