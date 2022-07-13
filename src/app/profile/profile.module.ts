import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { DetailsComponent } from './details/details.component';
import { AnimalhomeComponent } from './animalhome/animalhome.component';
import { HttpClientModule } from '@angular/common/http';
const routes: Routes = [
  {
    path: 'profile/animal',
    component: HomeComponent
  },
  {
    path: 'profile/home',
    component: AnimalhomeComponent
  },
  { path: 'profile/animal/:id', component: DetailsComponent }
]

@NgModule({
  declarations: [
    HomeComponent,
    DetailsComponent,
    AnimalhomeComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    HttpClientModule
  ]
})
export class ProfileModule { }
