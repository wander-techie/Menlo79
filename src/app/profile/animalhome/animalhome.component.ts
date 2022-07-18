import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable, of, Subject } from 'rxjs';
import { Animals } from '../interfaces/animals';
import { ProfileService } from '../profile.service';
import {
  debounceTime,
  startWith,
  map,
  distinctUntilChanged,
  filter,
  switchMap,
  takeUntil
} from "rxjs/operators";
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-animalhome',
  templateUrl: './animalhome.component.html',
  styleUrls: ['./animalhome.component.scss']
})
export class AnimalhomeComponent implements OnInit, OnDestroy {
  allAnimals: Animals[] = [];
  filteredAnimals: Animals[] = [];
  myControl = new FormControl('');
  options = [];
  filteredOptions!: Observable<any>;
  recordCount: number = 0;
  destroy$: Subject<boolean> = new Subject<boolean>();
  @ViewChild('animalNamesInput', { static: true }) animalNamesInput!: ElementRef;

  constructor(private profileService: ProfileService, private router: Router) { 
    
  }
  filter(val: string):Observable<any> {
    return of(this.allAnimals.filter(option => { 
      return option.name.toLowerCase().indexOf(val.toLowerCase()) === 0;
    }))
   }  

  ngOnInit(): void {
    this.getAnimals();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(val => {
            return this.filter(val || '')
      }) 
    )
  }

  getAnimals() {
    this.profileService.getAllAnimals().pipe(takeUntil(this.destroy$)).subscribe((data)=> {
      this.allAnimals = data;
    })
  }

  inputValueChanges() {
    const getData = fromEvent(this.animalNamesInput.nativeElement, 'keyup').pipe(
      // get value
      map((event: any) => {
        if(event.target.value === '') {
          this.getAnimals();
          return event.target.value;
        } else {
          return event.target.value;
        }
       
      })
      // if search key greater then 2
      , filter((res) => res.length > 1 )

      // Time between key events
      , debounceTime(800)

      // If previous search is diffent from latest   
      , distinctUntilChanged()

      // subscription
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

  getSelection(name: string) {
    if(name!=='') {
      this.profileService.getAnimalsByKey(name)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.filteredAnimals = res;
          this.recordCount = res.length;
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      })
    }
    
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
