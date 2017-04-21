import { User } from './user.model';

export class Training{
    id: number;
    name: string;
    createdOn: Date;
    sessionFrom: Date;
    sessionTo: Date;
    active: boolean;
    createdBy: User;
    trainer: User;
    isStarted: boolean;
}