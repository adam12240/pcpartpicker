import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { Firestore, collection, collectionData, addDoc, getFirestore } from '@angular/fire/firestore';
import { initializeApp } from 'firebase/app';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common'; 
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-addpc',
  imports: [
    FormsModule, 
    MatButtonModule, 
    MatInputModule, 
    MatSelectModule, 
    MatCardModule,
    CommonModule,
    MatSnackBarModule,
  ],
  templateUrl: './addpc.component.html',
  styleUrls: ['./addpc.component.css']
})
export class AddpcComponent {
  newCpu: any = { name: '', cores: 0, threads: 0, tdp: 0 };
  newGpu: any = { name: '', cores: 0, tmus: 0, rops: 0, memorySize: 0, busWidth: 0, memoryType: '' };
  newRam: any = { manufacturer: '', size: 0, mhz: 0, type: '' };

  private app = initializeApp(environment);
  private firestore: Firestore = getFirestore(this.app);

  constructor(private snackBar: MatSnackBar){}

  isPartDataValid(data: any): boolean {
    return Object.entries(data).every(([key, value]) => {
      if (typeof value === 'string') {
        return value.trim() !== '';
      }
      if (typeof value === 'number') {
        return value > 0;
      }
      return value !== null && value !== undefined;
    });
  }
  component = ''

  showAlertAndAdd(type: string, data: any) {
    const isValid = this.isPartDataValid(data);
  
    if (isValid) {
      this.addPart(type, data);
      this.snackBar.open(`${this.component} added successfully!`, 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
  
      if (type === 'cpus') this.newCpu = { name: '', cores: 0, threads: 0, tdp: 0 };
      if (type === 'gpus') this.newGpu = { name: '', cores: 0, tmus: 0, rops: 0, memorySize: 0, busWidth: 0, memoryType: '' };
      if (type === 'ram') this.newRam = { manufacturer: '', size: 0, mhz: 0, type: '' };
  
    } else {
      this.snackBar.open(`${this.component} couldn't be added! Check the values you provided!`, 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
    }
  }

  async addPart(collectionName: string, partData: any) {
    try {
      if (Object.values(partData).some(value => value === null || value === '' || value === undefined)) {
        return;
      }
      await addDoc(collection(this.firestore, collectionName), partData);
      console.log(`${partData.name} added to ${collectionName}`);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  }
}
