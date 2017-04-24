import { Component, OnInit } from '@angular/core';
import { Router  } from '@angular/router';

@Component({ 
  selector: 'my-app',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit  {  
  loggedUserId: any;
  loggedUser: string;

  constructor(private router: Router){}

  ngOnInit(): void {  
        this.loggedUserId = localStorage.getItem('userId');    
        this.loggedUser = localStorage.getItem('name');       
    }

    

    logout()  {
        localStorage.removeItem('userId');
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        this.router.navigate(['/']);        
    }

}
