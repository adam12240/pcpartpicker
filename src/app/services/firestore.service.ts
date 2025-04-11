import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firestore: Firestore) {}

  addData(data: any) {
    const ref = collection(this.firestore, 'items');
    return addDoc(ref, data);
  }

  getData(): Observable<any[]> {
    const ref = collection(this.firestore, 'items');
    return collectionData(ref, { idField: 'id' });
  }
}