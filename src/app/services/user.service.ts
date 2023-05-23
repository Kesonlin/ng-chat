import { Injectable } from '@angular/core';
import { User } from '../model';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // currentUser: Subject<User> = new BehaviorSubject<User>(null);
  // constructor() {}
  // public setCurrentUser(newUser: User): void {
  //   this.currentUser.next(newUser);
  // }
}
