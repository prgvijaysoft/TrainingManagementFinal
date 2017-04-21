import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from './Service/user.service';
import { Router  } from '@angular/router';

@Component({  
  templateUrl: 'login.component.html', 
  providers: [ UserService ]
})
export class LoginComponent  {
   userName: string;
   password: string;
   rememberMe: boolean;

   constructor(private userService:UserService, private router: Router) {}

   authenticate(): void{
      this.userService.authenticate(this.userName, this.password).subscribe(
        user =>{ 
          if(user != null) {
            console.log(user.role);
            var route = user.role == 'admin' ? '/admin': user.role == 'trainer' ? '/trainer' : '/login';
            console.log(route);
            this.router.navigate([route]);
          }
        },
        err => console.log(err),
        () => console.log('request completed')
      );
   }    
}