import { Component,  OnInit, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute  } from '@angular/router';
import { TrainingService } from '../../Service/training.service';
import { ScenarioService } from '../../Service/scenario.service';


import { User } from '../../Model/user.model';
import { Training } from '../../Model/training.model';
import { Scenario} from '../../Model/scenario.model'

@Component({   
  templateUrl: '../View/trainingdetail.component.html',
  providers: [ TrainingService, ScenarioService ]
})
export class TrainingDetailComponent implements OnInit  {  
  trainingId: number;
  scenarios: Scenario[];
  training: Training;
 
  id: number;
  name: string;
  createdOn: Date;
  sessionFrom: Date;
  sessionTo: Date;
  active: boolean;
  createdBy: User;
  trainer: User;
  isStarted: boolean;

  newScenario: string;

  constructor(private zone:NgZone,private scenarioService: ScenarioService, private trainingService: TrainingService,
    private router: Router, private activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {       
        this.activatedRoute.params.subscribe(
        params =>{
            this.trainingId = params['trainingid'];
            console.log(this.trainingId);
            this.getTraining();
            this.getScenarios();
        } )   
    }

    getTraining() {       
        this.trainingService.getTraining(this.trainingId).subscribe(
            _training =>{ 
                console.log('Training detail');
                this.training= _training;
                console.log(_training);    
            },
            err => console.log(err),
            () => console.log('request completed')
        );
    }

    getScenarios() {      
        this.scenarioService.getScenarios(this.trainingId).subscribe(
            _scenarios =>{                 
                if(_scenarios != null) {
                        console.log(_scenarios);
                        this.scenarios = _scenarios;
                }
            },
            err => console.log(err),
            () => console.log('request completed')
        );
    }

    addScenario() {
        let newScenario = new Scenario();
        newScenario.question = this.newScenario;
        newScenario.createdBy = new User();
        newScenario.createdBy.id = 1;
        newScenario.training = new Training();
        newScenario.training.id = this.trainingId;

        this.scenarioService.addNewScenario(newScenario).subscribe(
            _result => console.log(_result),
            err => console.log(err),
            () =>{ 
                console.log("scenario added");
                this.getScenarios();                                
            }
        )
    }    
}