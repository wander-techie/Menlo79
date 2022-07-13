import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  id: number | undefined;
  animalData:any;
  sub$: Subject<boolean> = new Subject<boolean>();
  constructor(private profileService: ProfileService) { 
    
  }

  ngOnInit(): void {
    this.profileService.getAnimalDetails.pipe(takeUntil(this.sub$)).subscribe((data)=> {
     this.animalData = data;
   })
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }

}
