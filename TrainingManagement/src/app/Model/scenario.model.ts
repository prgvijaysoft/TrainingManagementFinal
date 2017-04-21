import { User } from './user.model';
import { Training } from './training.model';

export class Scenario{
    id: number;
    question: string;
    createdOn: Date;  
    createdBy: User;  
    training: Training;     
}