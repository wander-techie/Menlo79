import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { Animals } from '../interfaces/animals';
import { ProfileService } from '../profile.service';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter,
  switchMap,
  takeUntil
} from "rxjs/operators";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  allAnimals: Animals[] = [];
  options = [];
  recordCount: number = 0;
  destroy$: Subject<boolean> = new Subject<boolean>();
  @ViewChild('animalNamesInput', { static: true }) animalNamesInput!: ElementRef;

  constructor(private profileService: ProfileService, private router: Router) 
  { } 

  ngOnInit(): void {
    this.getAllAnimals();
    this.inputValueChanges();
  }

  getAllAnimals() {
    this.profileService.getAllAnimals().subscribe((data)=> {
      this.allAnimals = data;
      this.recordCount = data.length;
    })
  }

  inputValueChanges() {
    fromEvent(this.animalNamesInput.nativeElement, 'keyup').pipe(
      // get value
      map((event: any) => {
        if(event.target.value === '') {
          this.getAllAnimals();
          return event.target.value;
        } else {
          return event.target.value;
        }
       
      }), filter((res) => res.length > 1 )

      // Time in milliseconds between key events
      , debounceTime(800)

      // If previous query is diffent from current   
      , distinctUntilChanged()
    ).pipe(takeUntil(this.destroy$)).subscribe((text: string) => {
      this.profileService.getAnimalsByKey(text)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.allAnimals = res;
          this.recordCount = res.length;
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      })
    });
  }
  
  getAnimalDetails(details:Animals) {
    this.profileService.setAnimalDetails(details);
    this.router.navigate(['/profile/animal', details.id])
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
