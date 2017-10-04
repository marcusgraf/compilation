import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {User} from "../../models/user";
import {VayooApiServiceProvider} from "../vayoo-api-service/vayoo-api-service";

interface Users{
  [id: number]: User
}

@Injectable()
export class UserServiceProvider {
  users: Users = {};
  userChanged = new Subject<User>();
  currentUser: User;

  constructor(){}

  saveUser(userData){
    const newUser = new User(userData);
    this.currentUser = newUser;
    this.users[newUser.clientId] = newUser;
    this.userChanged.next(newUser);
  }
}
