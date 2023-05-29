import { Injectable } from '@angular/core';
import { User } from '../model';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // 保存最新的值，确保最新的订阅者能够知道当前用户
  currentUser: Subject<User> = new BehaviorSubject<User>(new User('', ''));
  constructor() {}
  public setCurrentUser(newUser: User): void {
    this.currentUser.next(newUser);
  }
}
