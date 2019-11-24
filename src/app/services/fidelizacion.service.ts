import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FidelizacionService {

  constructor(private firestore: AngularFirestore) { }

  create_NewItem(record) {
    return this.firestore.collection('fidelizacion').add(record);
  }
 
  read_Items() {
    return this.firestore.collection('fidelizacion').snapshotChanges();
  }
 
  update_Item(recordID,record){
    this.firestore.doc('fidelizacion/' + recordID).update(record);
  }
 
  delete_Item(record_id) {
    this.firestore.doc('fidelizacion/' + record_id).delete();
  }

  
}
