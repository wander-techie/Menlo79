import { HttpClient } from "@angular/common/http";
import { TestBed } from '@angular/core/testing';
import { of } from "rxjs";
import { ProfileService } from "./profile.service"

describe('profile Service', () => {
    let httpClientSpy: jasmine.SpyObj<HttpClient>;
    let profileService: ProfileService;
    let responseData = [
        {
            id: 0,
            name: "Aardvark",
            intro: "Macaws, a kind of parrot, are adept at mimicking a wide range of sounds, including human speech. But their natural call sounds like a shrill scream",
            facts: "The presence of muscles and mobility is one of the primary characteristics of the animal kingdom",
            info: "Animals are multicellular eukaryotes whose cells are bound together by collagen. Animals dominate human conceptions of life on Earth because of their size, diversity, abundance, and mobility. "
          },
          {
            id: 1,
            name: "Aardvark",
            intro: "Macaws, a kind of parrot, are adept at mimicking a wide range of sounds, including human speech. But their natural call sounds like a shrill scream",
            facts: "The presence of muscles and mobility is one of the primary characteristics of the animal kingdom",
            info: "Animals are multicellular eukaryotes whose cells are bound together by collagen. Animals dominate human conceptions of life on Earth because of their size, diversity, abundance, and mobility. "
          },
    ]
    beforeEach(() => {
        let httpClientSpyObj = jasmine.createSpyObj('HttpClient', ['get']);
        TestBed.configureTestingModule({
            providers:[
                ProfileService, 
                {
                    provide: HttpClient,
                    useValue: httpClientSpyObj
                }
            ]
        });
        profileService = TestBed.inject(ProfileService);
        httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    })

    describe('getAnimalsByKey()', ()=> {
        it('getAnimalsByKey should return data', (done: DoneFn) => {
            httpClientSpy.get.and.returnValue(of(responseData));
            profileService.getAnimalsByKey('ant').subscribe({
                next: (data)=> {
                    expect(data).toEqual(responseData);
                    done();
                },
                error: ()=> {
                    done.fail;
                }
            });
            expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
        });
    });
    describe('getAllAnimals()', ()=> {
        it('getAllAnimals should return data', (done: DoneFn) => {
            httpClientSpy.get.and.returnValue(of(responseData));
            profileService.getAllAnimals().subscribe({
                next: (data)=> {
                    expect(data).toEqual(responseData);
                    done();
                },
                error: ()=> {
                    done.fail;
                }
            });
            expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
        });
    })
    
})