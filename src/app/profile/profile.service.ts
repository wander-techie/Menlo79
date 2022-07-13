import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Animals } from './interfaces/animals';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {

  private animalDetails = new BehaviorSubject({});
  getAnimalDetails = this.animalDetails.asObservable();

  constructor(private http: HttpClient) { }
  
  getAnimalsByKey(data: string) {
    return this.http.get<Animals[]>(`http://localhost:3000/animals?q=${data}`);
  }
  getAllAnimals() {
    return this.http.get<Animals[]>(`http://localhost:3000/animals`);
  }
  setAnimalDetails(data:Animals) {
    this.animalDetails.next(data);
  }


}
