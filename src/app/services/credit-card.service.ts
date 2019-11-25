import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  private snapshotChangesSubscription: any;

  constructor(private afs: AngularFirestore,public afAuth: AngularFireAuth) { }

  create_NewItem(record) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('restaurantes').doc(currentUser.uid).collection('creditCard').add(record)
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }
 
  read_Items() {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if(currentUser){
          this.snapshotChangesSubscription = this.afs.collection('restaurantes').doc(currentUser.uid).collection('creditCard').snapshotChanges();
          resolve(this.snapshotChangesSubscription);
        }
      })
    })
  }

   getItem(itemID){
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if(currentUser){
          this.snapshotChangesSubscription = this.afs.doc<any>('restaurantes/' + currentUser.uid + '/creditCard/' + itemID).valueChanges()
          .subscribe(snapshots => {
            resolve(snapshots);
          }, err => {
            reject(err)
          })
        }
      })
    });
  }
 
  update_Item(recordID,record){
    console.log(record);
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('restaurantes').doc(currentUser.uid).collection('creditCard').doc(recordID).set(record)
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }
 
  delete_Item(record_id) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('restaurantes').doc(currentUser.uid).collection('creditCard').doc(record_id).delete()
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

}
