import { HERO_DELETED_KO } from './../../common/texts/toastrTexts';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroUseCase } from '../../infrastucture/user-cases/hero.usercase';
import { Hero } from '../../domain/models/hero';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MaterialModule } from '../../shared/material/material.module';
import { ToastrService } from 'ngx-toastr';
import { HERO_DELETED_OK, HERO_SAVED_KO, HERO_SAVED_OK, HERO_UPDATE_KO, HERO_UPDATE_OK } from '../../common/texts/toastrTexts';
import { AppComponent } from '../../app.component';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { ALTER_EGO, CHARACTERS, DETAIL_NEW_TITLE, DETAIL_UPDATE_TITLE, FILE_SELECTED, FIRST_APPEREANCE, SELECT_A_FILE, SUPER_HERO_NAME } from '../../common/texts/webText';
import { SAVE, UPDATE } from '../../common/texts/buttonsText';


@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MaterialModule, LoaderComponent

  ],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HeroDetailComponent {

  public selectedHero: Hero | null = null;
  public isEdition = true;
  public tittle = '';

  public superheroForm: FormGroup;
  public loading = false;

  public myFile: File = {} as File;

  public fileSelected = FILE_SELECTED;
  public superHeroName = SUPER_HERO_NAME;
  public alterEgo = ALTER_EGO;
  public character = CHARACTERS;

  public firstApparearance = FIRST_APPEREANCE;
  public selectFile = SELECT_A_FILE;

  public updateBtn = UPDATE;
  public SaveBtn = SAVE;


  constructor(private heroUseCase: HeroUseCase,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService) {

    this.superheroForm = new FormGroup({
      alterEgo: new FormControl('', [Validators.required, Validators.minLength(4)]),
      characters: new FormControl('', [Validators.required, Validators.minLength(4)]),
      firstAppearance: new FormControl('', [Validators.required, Validators.minLength(4)]),
      publisher: new FormControl('', [Validators.required, Validators.minLength(4)]),
      superhero: new FormControl('', [Validators.required, Validators.minLength(4)]),
      urlImg: new FormControl('', [Validators.required, Validators.minLength(4)]),

    });

    this.loadHero();
  }

  loadHero() {
    const idHeroe = this.getIdFromPath()?.toString();
    if (idHeroe === undefined || idHeroe?.length < 1) {
      this.isEdition = false;
    } else {
      this.isEdition = true;
    }
    this.paintTittle();
    this.getHero(idHeroe);
  }


  getIdFromPath() {
    let id = 0;
    this.route.params.subscribe(params => {
      id = params['id'];

    });
    return id;
  }

  getHero(id: string) {
    this.loading = true;
    this.heroUseCase.getHero(id).subscribe(hero => {
      setTimeout(() => {
        this.loading = false;
        this.selectedHero = hero;
        this.fillForm();
      }, 2000);
    });
  }

  paintTittle() {
    this.tittle = DETAIL_NEW_TITLE;

    if (this.isEdition) {
      this.tittle = DETAIL_UPDATE_TITLE;
    }
  }


  saveHeroDetail() {
    this.loading = true;
    const myHero = this.getHeroFromForm();

    if (this.isEdition) {
      this.heroUseCase.updateHero(myHero).subscribe(result => {
        this.toastr.success(HERO_UPDATE_OK, '');
        this.goBack();
      }, (error) => {
        this.toastr.warning(HERO_UPDATE_KO, '');
      }, () => { this.loading = false; })
    } else {
      this.heroUseCase.addHero(myHero).subscribe(result => {
        this.toastr.success(HERO_SAVED_OK, '');
        this.goBack();
      }, (error) => {
        this.toastr.warning(HERO_SAVED_KO, '');
      }, () => { this.loading = false; })
    }
  }

  getHeroFromForm() {

    const id = this.selectedHero ? this.selectedHero.id : this.getNewId();
    const myHero: Hero = {
      id,
      superhero: this.superheroForm.controls['superhero'].value,
      publisher: this.superheroForm.controls['publisher'].value,
      alter_ego: this.superheroForm.controls['alterEgo'].value,
      first_appearance: this.superheroForm.controls['firstAppearance'].value,
      characters: this.superheroForm.controls['characters'].value,
    }

    return myHero;
  }

  getNewId() {
    const result = this.superheroForm.controls['publisher'].value.split(' ')[0].toString().toLowerCase() + '-' + this.superheroForm.controls['superhero'].value.split(' ').join();
    return result
  }
  fillForm() {

    this.superheroForm.controls['superhero'].patchValue(this.selectedHero?.superhero);
    this.superheroForm.controls['publisher'].patchValue(this.selectedHero?.publisher);
    this.superheroForm.controls['alterEgo'].patchValue(this.selectedHero?.alter_ego);
    this.superheroForm.controls['firstAppearance'].patchValue(this.selectedHero?.first_appearance);
    this.superheroForm.controls['characters'].patchValue(this.selectedHero?.characters);
  }

  deleteHeroDetail() {
    this.loading = true;
    if (this.selectedHero?.id) {
      this.heroUseCase.deleteHero(this.selectedHero.id).subscribe(result => {
        this.toastr.success(HERO_DELETED_OK, '');
        this.goBack();
      }, (error) => {
        this.toastr.warning(HERO_DELETED_KO, '');
      }, () => { this.loading = false; })
    }
  }

  goBack() {
    this.router.navigate(['/heroes']);
  }

  onFileSelected(event: any) {
    this.myFile = event.target.files[0];



  }
}
