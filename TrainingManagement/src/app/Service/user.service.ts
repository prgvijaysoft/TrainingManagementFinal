import { Injectable } from '@angular/core';
import { Http, Headers }  from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { User } from '../Model/user.model';

@Injectable()
export class UserService{
    baseUrl: string = "http://localhost:3040/api/";
    headers = new Headers({'Content-Type': 'application/json'});
    constructor(private http: Http){}

    addNewUser(user: User): Observable<any>{       
         return this.http.post(this.baseUrl +'user', user, this.headers)
        .map(response => console.log(response) );
    }

    updateUser(id: number, user: any) : Observable<any>{  
         console.log(id);
         console.log(user);
         return this.http.post(this.baseUrl +'updateuser?id=' + id, user, this.headers)
        .map(response => console.log(response) );
    }

    assignRole(userName: string, role:string): Observable<User>{
        return null;
    }

    getUsers(): Observable<User[]>{
        return this.http.get(this.baseUrl +'users')
        .map(response => response.json() as User[]);
    }

    getUsersByRole(role: string): Observable<User[]>{
        return this.http.get(this.baseUrl +'usersbyrole?role=' + role)
        .map(response => response.json() as User[]);
    }

    getUser(userName: string): Observable<User>{
        return this.http.get(this.baseUrl + 'user?username=' + userName)
        .map(response => response.json() as User);
    }

    authenticate(userName: string, password: string): Observable<User>{
        console.log('service: authenticating');
        return this.http.post(this.baseUrl + 'authenticate', { username: userName, password:password }, 
        this.headers).map(response => response.json());
    }
} 
