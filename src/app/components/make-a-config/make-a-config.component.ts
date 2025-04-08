import { Component, ChangeDetectorRef, signal, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Firestore, collection, collectionData, addDoc, deleteDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { MatIconModule } from '@angular/material/icon';
import { onAuthStateChanged } from '@angular/fire/auth';

@Component({
  selector: 'app-make-a-config',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    CommonModule,
    MatSnackBarModule,
    MatIconModule,
  ],
  templateUrl: './make-a-config.component.html',
  styleUrls: ['./make-a-config.component.css']
})
export class MakeAConfigComponent implements OnInit{
  private firestore = inject(Firestore);
  private auth = inject(Auth);
  private snackBar = inject(MatSnackBar);
  private cdRef = inject(ChangeDetectorRef);

  buildName = '';
  private _cpu = signal<any>(null);
  private _gpu = signal<any>(null);
  private _ram = signal<any>(null);
  builds = signal<any[]>([]);

  cpus$: Observable<any[]>;
  gpus$: Observable<any[]>;
  rams$: Observable<any[]>;

  constructor() {
    this.cpus$ = collectionData(collection(this.firestore, 'cpus'), { idField: 'id' });
    this.gpus$ = collectionData(collection(this.firestore, 'gpus'), { idField: 'id' });
    this.rams$ = collectionData(collection(this.firestore, 'ram'), { idField: 'id' });
  }

  ngOnInit(): void {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.loadBuilds();
      }
    });
  }

  get cpu() { return this._cpu(); }
  set cpu(value: any) { this._cpu.set(value); }

  get gpu() { return this._gpu(); }
  set gpu(value: any) { this._gpu.set(value); }

  get ram() { return this._ram(); }
  set ram(value: any) { this._ram.set(value); }

  async createBuild() {
    if (!this.buildName || !this.cpu || !this.gpu || !this.ram) {
      this.snackBar.open('Please complete all fields before creating a build.', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
      return;
    }
  
    const user = this.auth.currentUser;
    if (!user) {
      this.snackBar.open('You must be logged in to create a build.', 'Close', {
        duration: 3000,
      });
      return;
    }
  
    const build = {
      name: this.buildName,
      cpu: this.cpu,
      gpu: this.gpu,
      ram: this.ram,
      createdAt: new Date(),
    };
  
    // Save the build under the user's specific 'builds' collection
    const buildsCollection = collection(this.firestore, `users/${user.uid}/builds`);
    await addDoc(buildsCollection, build);
    this.snackBar.open('Build created successfully!', 'Close', { duration: 2500 });
    this.buildName = '';
    this._cpu.set(null);
    this._gpu.set(null);
    this._ram.set(null);
    this.loadBuilds();
  }

  private loadBuilds() {
    const user = this.auth.currentUser;
    if (!user) return;
  
    const buildsCollection = collection(this.firestore, `users/${user.uid}/builds`);
    collectionData(buildsCollection, { idField: 'id' }).subscribe((allBuilds) => {
      console.log("Reactive load: ", allBuilds);
      this.builds.set(allBuilds);
    });
  }
  
  async deleteBuild(buildId: string) {
    const user = this.auth.currentUser;
    if (!user) return;
  
    const buildRef = doc(this.firestore, `users/${user.uid}/builds`, buildId);
    try {
      await deleteDoc(buildRef);
      this.snackBar.open('Build deleted.', 'Close', { duration: 2000 });
      this.loadBuilds();
    } catch (error) {
      this.snackBar.open('Failed to delete build.', 'Close', { duration: 3000 });
      console.error(error);
    }
  }
}
