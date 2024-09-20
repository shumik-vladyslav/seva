import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private firestore: AngularFirestore) { }

  getEvents(): Observable<any[]> {
    return this.firestore.collection('events').valueChanges({ idField: 'docId' });
  }

  addEvent(event: any) {
    return this.firestore.collection('events').add(event);
  }

  deleteEvent(eventId: string): Promise<void> {
    return this.firestore.collection('events').doc(eventId).delete();
  }
}