import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { PersonalDataModel } from '../model/personalData.model';


@Injectable({
  providedIn: 'root'
})
export class PersonalInfoResourceService {

  constructor( private firestore: AngularFirestore) { }

  getPersonalInfo(): Observable<PersonalDataModel[]> {
    return this.firestore.collection('personal-info').valueChanges() as Observable<PersonalDataModel[]> ;
  }

}
