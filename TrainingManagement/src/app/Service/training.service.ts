import { Injectable } from '@angular/core';
import { Http, Headers }       from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Training } from '../Model/training.model';

@Injectable()
export class TrainingService{
    baseUrl: string = "http://localhost:3040/api/";
    headers = new Headers({'Content-Type': 'application/json'});
    constructor(private http: Http){}

    addNewTraining(training: Training): Observable<any>{       
         return this.http.post(this.baseUrl +'training', training, this.headers)
        .map(response => console.log(response) );
    }

    update(id: number, _active: boolean, _isStarted: boolean): Observable<any>{
         return this.http.post(this.baseUrl +'updateTraining?id=' + id, {active: _active, isStarted: _isStarted}, this.headers)
        .map(response => console.log(response));
    }

    getTrainings(active: boolean, isStarted: boolean): Observable<Training[]>{
        let url = this.baseUrl + "trainings"  + (active != null && isStarted != null ? 
        "?active=" + active + "&isStarted=" + isStarted : (active != null ? "?active=" + active : 
        (isStarted != null? "?isStarted=" + isStarted : "") )); 

        return this.http.get(url)
        .map(response => response.json() as Training[]);
    } 

    getTrainerTrainings(trainerId: number): Observable<Training[]>{      
        console.log(this.baseUrl + 'trainertrainings?trainerid=' + 1);
        return this.http.get(this.baseUrl + 'trainertrainings?trainerid=' + 1)
        .map(response => response.json() as Training[]);
    } 

    getTraining(id: number): Observable<Training>{
        return this.http.get(this.baseUrl + 'training?id' + id)
        .map(response => response.json().data as Training);
    }
}