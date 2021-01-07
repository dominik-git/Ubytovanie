import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DormitoryModel } from '../model/dormitory.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DormitoryResourceService {

  constructor(private firestore: AngularFirestore) { }

  getAllDormitory(){
    const dormitoryCollection = this.firestore.collection('dormitory');
    return dormitoryCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as DormitoryModel;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
}
