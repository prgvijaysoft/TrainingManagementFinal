import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../Service/user.service';
import { TrainingService } from '../../Service/training.service';
import { Router  } from '@angular/router';

import { User } from '../../Model/user.model';
import { Training } from '../../Model/training.model';

@Component({  
  templateUrl: '../View/trainingmanagement.component.html', 
  providers: [ UserService, TrainingService ]
})
export class TrainingManagementComponent implements OnInit  {
   id: number;
   name: string;
   createdOn: Date;
   sessionFrom: Date;
   sessionTo: Date;
   active: boolean;
   createdBy: User;
   trainer: User;
   isStarted: boolean;
   errorMessage: string;
   selectedTrainerId: number;

   

   public filterQuery = "";
   public rowsOnPage = 10;
   public sortBy = "email";
   public sortOrder = "asc";

   trainings: Training[];
   trainers: User[];

   constructor(private userService: UserService, private trainingService: TrainingService,
    private router: Router) {}

    ngOnInit(): void {
        this.getTrainers();
        this.getTrainings();
    }

    getTrainers() {
        this.userService.getUsersByRole('trainer').subscribe(
            trainerList =>{ 
                
                if(trainerList != null) {
                        console.log(trainerList);
                        this.trainers = trainerList;
                }
            },
            err => console.log(err),
            () => console.log('request completed')
        );
    }

    addTraining() {
        let newTraining = new Training();
        newTraining.name = this.name;
        newTraining.sessionFrom = this.sessionFrom;
        newTraining.sessionTo = this.sessionTo;
        newTraining.trainer = new User();
        newTraining.trainer.id = this.selectedTrainerId;
        newTraining.createdBy = new User();
        newTraining.createdBy.id = this.selectedTrainerId;
        newTraining.active = true;
        console.log('Training:');
        console.log(newTraining);
        this.trainingService.addNewTraining(newTraining).subscribe(
            response => {
                console.log('Created');
                this.getTrainings();
            },
            err =>  console.log(err)          
        );
    }

    getTrainings() {
        this.trainingService.getTrainings(null, null).subscribe(
            trainingList =>{                 
                if(trainingList != null) {
                        console.log(trainingList);
                        this.trainings = trainingList;
                }
            },
            err => console.log(err),
            () => console.log('request completed')
        );
    }

   
}