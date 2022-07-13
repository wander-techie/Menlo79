import { HttpClient } from "@angular/common/http";
import { Location } from '@angular/common';
import { ComponentFixture, fakeAsync, TestBed } from "@angular/core/testing"
import { Router } from "@angular/router";
import { of } from "rxjs";
import { Animals } from "../interfaces/animals";
import { ProfileService } from "../profile.service";
import { HomeComponent } from "./home.component"

describe("home Component", () => {
    let allAnimals:Animals[];
    let httpClientSpy: jasmine.SpyObj<HttpClient>;
    let component: HomeComponent;
    let fixture:any;
    let location: Location;
    fixture = ComponentFixture<HomeComponent>;
    let mockProfileService:any;
    let mockRouter: Router;
    beforeEach(() => {
        allAnimals = [
            {
            id: 0,
            name: "Aardvark",
            intro: "mock data",
            facts: "mock data",
            info: "mock data"
        },
        {
            id: 0,
            name: "Aardvark",
            intro: "mock data",
            facts: "mock data",
            info: "mock data"
        }];
        let httpClientSpyObj = jasmine.createSpyObj('HttpClient', ['get']);
        let mockRouterSpyObj = jasmine.createSpyObj('Router', ['navigate']);
        
        mockProfileService = jasmine.createSpyObj(['getAllAnimals', 'getAnimalsByKey', 'setAnimalDetails']);
        TestBed.configureTestingModule({
            declarations:[HomeComponent],
            providers:[ 
                {
                    provide: HttpClient,
                    useValue: httpClientSpyObj
                },
                {
                    provide: Router,
                    useValue: mockRouterSpyObj
                },
                {
                    provide: ProfileService,
                    useValue: mockProfileService
                },
                
            ]
        });
        mockProfileService.getAllAnimals.and.returnValue(of(true));
        httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
        mockRouter = TestBed.inject(Router);
        location = TestBed.inject(Location);
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;   
        
    });
    it('should check component is defined', ()=> {        
        expect(component).toBeDefined();
    });

    it('should set data from service directly for getAllAnimal', ()=> {        
       
      mockProfileService.getAllAnimals.and.returnValue(of(allAnimals));
      fixture.detectChanges();
      expect(component.allAnimals.length).toBe(2);
    });
    it('should set data from service directly for getAnimalDetails', fakeAsync(()=> {        
        mockProfileService.setAnimalDetails.and.returnValue(of(allAnimals[0]))
       // fixture.detectChanges();
       mockRouter.navigate(['/profile/animal', 1]);
       expect(location.path()).toBe('/context.html');
    }));
    

});

