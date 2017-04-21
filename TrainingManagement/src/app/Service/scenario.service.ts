import { Injectable } from '@angular/core';
import { Http, Headers }       from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Scenario } from '../Model/scenario.model';

@Injectable()
export class ScenarioService{
    baseUrl: string = "http://localhost:3040/api/";
    headers = new Headers({'Content-Type': 'application/json'});
    constructor(private http: Http){}

    addNewScenario(scenario: Scenario): Observable<any>{       
         return this.http.post(this.baseUrl + 'scenario', scenario, this.headers)
        .map(response => console.log(response));
    }

    completeScenario(id: number, _active: boolean, _completed: boolean): Observable<any>{
         return this.http.post(this.baseUrl +'completescenario?id=' + id, {completed: _completed}, this.headers)
        .map(response => console.log(response));
    }

    getScenarios(trainingId: number): Observable<Scenario[]>{
        let url = this.baseUrl + "trainings?trainingid="  + trainingId;
        return this.http.get(url).map(response => response.json() as Scenario[]);
    } 

    getScenario(id: number): Observable<Scenario>{
        return this.http.get(this.baseUrl + 'scenario?id' + id)
        .map(response => response.json().data as Scenario);
    }
}