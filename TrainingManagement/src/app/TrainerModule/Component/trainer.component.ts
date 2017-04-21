import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../Service/user.service';
import { TrainingService } from '../../Service/training.service';
import { Router  } from '@angular/router';

import { User } from '../../Model/user.model';
import { Training } from '../../Model/training.model';

@Component({   
  templateUrl: '../View/trainer.component.html',
   providers: [ UserService, TrainingService ]
})
export class TrainerComponent implements OnInit  {  
  isVisible:boolean = false;  
  trainings: Training[];

  constructor(private userService: UserService, private trainingService: TrainingService,
    private router: Router) {}

    ngOnInit(): void {       
        this.getTrainings();
    }

    toggle() {
        this.isVisible = !this.isVisible;
    }

  getTrainings() {
        this.trainingService.getTrainerTrainings(1).subscribe(
            trainingList =>{                 
                if(trainingList != null) {
                        console.log('Training details:');
                        console.log(trainingList);
                        this.trainings = trainingList;
                }
            },
            err => console.log(err),
            () => console.log('request completed')
        );
    }


    detail(trainingId: number){

    }

}