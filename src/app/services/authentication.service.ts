// authentication.service.ts
import { Injectable } from '@angular/core';

import { AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Task } from '../task';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(
    private afAuth: AngularFireAuth,
    public firestore: AngularFirestore
  ) { }

  registerUser(value) {
    return new Promise<any>((resolve, reject) => {

      this.afAuth.createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err));
    });

  }

  loginUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err));
    });
  }

  logoutUser() {
    return new Promise((resolve, reject) => {
      if (this.afAuth.currentUser) {
        this.afAuth.signOut()
          .then((res) => {
            console.log('LOG Out');
            resolve(res);
          }).catch((error) => {
            reject();
          });
      }
    });
  }
  //ajouter un task to do
  addTask(
    taskName: string,
    taskTime: string
  ){ return new Promise<void> ((resolve, reject) => {
    const id = this.firestore.createId();
    console.log(id);
    return this.firestore.doc(`taskList/${id}`).set({
      id,
      taskName,
      taskTime
    }).then((res) => {

      resolve(res);
    }).catch((error) => {
      reject();
    });
  });
}

//Get all tasks
getallTasks(): Observable<any[]> {
  return this.firestore.collection<any>(`taskList`).valueChanges();
}

  userDetails() {
    return this.afAuth.user;
  }
}

