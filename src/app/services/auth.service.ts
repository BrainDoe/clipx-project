import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import IUser from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userCollection: AngularFirestoreCollection<IUser>;

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore
  ) { 
    this.userCollection = db.collection('users');
  }

  async createUser(userData: IUser) {
    if(!userData.password) {
      throw new Error("Password is required");
    }
    const userCred = await this.auth.createUserWithEmailAndPassword(userData.email, userData.password);

    if(!userCred) {
      throw new Error("User not found!")
    }
      
      await this.userCollection.doc(userCred.user?.uid).set({
        name: userData.name,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        age: userData.age
      })

      await userCred.user?.updateProfile({
        displayName: userData.name
      });
  }
}
