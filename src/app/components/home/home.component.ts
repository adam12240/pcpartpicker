import { Component, ChangeDetectorRef, Inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { Firestore, collection, collectionData, getFirestore } from '@angular/fire/firestore';
import { initializeApp } from 'firebase/app';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Import MatSnackBarModule
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  imports: [
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    CommonModule,
    MatSnackBarModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  private _cpu1 = signal<any>(null);
  private _gpu1 = signal<any>(null);
  private _ram1 = signal<any>(null);

  private _cpu2 = signal<any>(null);
  private _gpu2 = signal<any>(null);
  private _ram2 = signal<any>(null);

  comparisonResults = signal<string>('');

  private app = initializeApp(environment);
  private firestore: Firestore = getFirestore(this.app);

  cpus$: Observable<any[]>;
  gpus$: Observable<any[]>;
  rams$: Observable<any[]>;

  constructor(
    private cdRef: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) {
    this.cpus$ = collectionData(collection(this.firestore, 'cpus'), { idField: 'id' });
    this.gpus$ = collectionData(collection(this.firestore, 'gpus'), { idField: 'id' });
    this.rams$ = collectionData(collection(this.firestore, 'ram'), { idField: 'id' });
  }

  get cpu1(): any { return this._cpu1(); }
  set cpu1(value: any) { this._cpu1.set(value); }

  get gpu1(): any { return this._gpu1(); }
  set gpu1(value: any) { this._gpu1.set(value); }

  get ram1(): any { return this._ram1(); }
  set ram1(value: any) { this._ram1.set(value); }

  get cpu2(): any { return this._cpu2(); }
  set cpu2(value: any) { this._cpu2.set(value); }

  get gpu2(): any { return this._gpu2(); }
  set gpu2(value: any) { this._gpu2.set(value); }

  get ram2(): any { return this._ram2(); }
  set ram2(value: any) { this._ram2.set(value); }

  comparePCs() {
    let resultHtml = `<h3>Comparison Results</h3>`;

    const compareValues = (val1: number, val2: number) =>
      val1 > val2 ? '>' : val1 < val2 ? '<' : '=';

    resultHtml += `<strong>CPU:</strong> ${this.cpu1.name} vs ${this.cpu2.name}<br>`;
    resultHtml += `Cores: ${this.cpu1.cores} ${compareValues(this.cpu1.cores, this.cpu2.cores)} ${this.cpu2.cores}<br>`;
    resultHtml += `Threads: ${this.cpu1.threads} ${compareValues(this.cpu1.threads, this.cpu2.threads)} ${this.cpu2.threads}<br>`;
    resultHtml += `TDP: ${this.cpu1.tdp}W ${compareValues(this.cpu2.tdp, this.cpu1.tdp)} ${this.cpu2.tdp}W<br><br>`;

    resultHtml += `<strong>GPU:</strong> ${this.gpu1.name} vs ${this.gpu2.name}<br>`;
    resultHtml += `Cores: ${this.gpu1.cores} ${compareValues(this.gpu1.cores, this.gpu2.cores)} ${this.gpu2.cores}<br>`;
    resultHtml += `TMUs: ${this.gpu1.tmus} ${compareValues(this.gpu1.tmus, this.gpu2.tmus)} ${this.gpu2.tmus}<br>`;
    resultHtml += `ROPs: ${this.gpu1.rops} ${compareValues(this.gpu1.rops, this.gpu2.rops)} ${this.gpu2.rops}<br>`;
    resultHtml += `Memory Size: ${this.gpu1.memorySize}MB ${compareValues(this.gpu1.memorySize, this.gpu2.memorySize)} ${this.gpu2.memorySize}MB<br>`;
    resultHtml += `Bus Width: ${this.gpu1.busWidth} bit ${compareValues(this.gpu1.busWidth, this.gpu2.busWidth)} ${this.gpu2.busWidth} bit<br>`;
    resultHtml += `Memory Type: ${this.gpu1.memoryType} vs ${this.gpu2.memoryType}<br><br>`;

    resultHtml += `<strong>RAM:</strong>: ${this.ram1.manufacturer} vs ${this.ram2.manufacturer}<br>`;
    resultHtml += `Size: ${this.ram1.size}GB ${compareValues(this.ram1.size, this.ram2.size)} ${this.ram2.size}GB<br>`;
    resultHtml += `MHz: ${this.ram1.mhz}MHz ${compareValues(this.ram1.mhz, this.ram2.mhz)} ${this.ram2.mhz}MHz<br>`;
    resultHtml += `Type: ${this.ram1.type} vs ${this.ram2.type}<br>`;

    this.comparisonResults.set(resultHtml);
    this.cdRef.detectChanges();
  }
  

  showAlertAndCompare() {
    if (!this.cpu1 || !this.cpu2 || !this.gpu1 || !this.gpu2 || !this.ram1 || !this.ram2) {
      this.snackBar.open(`You have failed to fill in all the information.`, 'Close', {
        duration: 3000, 
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
    } else {
      this.comparePCs();
    }
  }
}
