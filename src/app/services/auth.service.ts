import { Injectable, computed, signal, inject } from '@angular/core';
import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User,
  onAuthStateChanged,
} from '@angular/fire/auth';
import {
  Firestore,
  doc,
  setDoc,
  getDoc,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class AuthService {
  userData = signal<User | null>(null);
  userRole = signal<string | null>(null);

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        const userRef = doc(this.firestore, `users/${user.uid}`);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          console.warn('[AuthService] User signed in, but Firestore entry missing. Signing out...');
          await this.googleSignOut(true);
          return;
        }

        this.userData.set(user);
        await this.loadUserRole(user.uid);
      } else {
        this.userData.set(null);
        this.userRole.set(null);
      }
    });
  }

  async googleSignIn() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(this.auth, provider);
    this.userData.set(result.user);
    await this.saveUserToFirestore(result.user);
    await this.loadUserRole(result.user.uid);
  }

  async googleSignOut(showNotification = false) {
    await signOut(this.auth);
    this.userData.set(null);
    this.userRole.set(null);
    this.router.navigate(['/']);

    if (showNotification) {
      this.snackBar.open(
        'Your account no longer exists. You have been signed out.',
        'Dismiss',
        { duration: 5000 }
      );
    }
  }

  private async saveUserToFirestore(user: User) {
    const userRef = doc(this.firestore, `users/${user.uid}`);
    const existingSnap = await getDoc(userRef);
    const existingData = existingSnap.data();

    const userData: any = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      builds: []
    };

    if (!existingData || !existingData['role']) {
      userData.role = 'user';
    }

    await setDoc(userRef, userData, { merge: true });
  }

  private async loadUserRole(uid: string) {
    const userRef = doc(this.firestore, `users/${uid}`);
    const userSnap = await getDoc(userRef);
    const data = userSnap.data();
    this.userRole.set(data?.['role'] || 'user');
  }

  isAdmin = computed(() => this.userRole() === 'admin');
}
