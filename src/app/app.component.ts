import { Component, inject } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { Firestore } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [HeaderComponent,RouterOutlet,FooterComponent]
})
export class AppComponent{
  title="PC Part Picker";

  constructor(private firestore: Firestore, private auth: Auth) {}
}