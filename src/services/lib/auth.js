import { auth as firebaseAuth, db } from '@config/firebase.config';
import { account as appwriteAuth } from '@config/appwrite.config';
import { supabase } from '@config/supabase.config';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  sendPasswordResetEmail,
  verifyBeforeUpdateEmail,
  updateProfile,
  GithubAuthProvider
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc,
  deleteDoc 
} from 'firebase/firestore';

class AuthProvider {
  constructor(provider) {
    this.provider = provider;
  }

  serializeUser(user) {
    if (!user) return null;
    
    // Return only serializable properties
    return {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      photoURL: user.photoURL,
      providerData: user.providerData,
      metadata: {
        creationTime: user?.metadata?.creationTime,
        lastSignInTime: user?.metadata?.lastSignInTime
      }
    };
  }

  async login(email, password) {
    switch(this.provider) {
      case 'firebase':
        const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
        return this.serializeUser(userCredential.user);
      case 'appwrite':
        return await appwriteAuth.createEmailSession(email, password);
      case 'supabase':
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        return data.user;
      default:
        throw new Error('Invalid provider');
    }
  }

  async signup(email, password) {
    switch(this.provider) {
      case 'firebase':
        const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
        return this.serializeUser(userCredential.user);
      case 'appwrite':
        return await appwriteAuth.create('unique()', email, password);
      case 'supabase':
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        return data.user;
      default:
        throw new Error('Invalid provider');
    }
  }

  async logout() {
    switch(this.provider) {
      case 'firebase':
        return await signOut(firebaseAuth);
      case 'appwrite':
        return await appwriteAuth.deleteSession('current');
      case 'supabase':
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        return;
      default:
        throw new Error('Invalid provider');
    }
  }

  async getCurrentUser() {
    switch(this.provider) {
      case 'firebase':
        return new Promise((resolve, reject) => {
          const unsubscribe = firebaseAuth.onAuthStateChanged(user => {
            unsubscribe();
            resolve(this.serializeUser(user));
          }, reject);
        });
      case 'appwrite':
        try {
          return await appwriteAuth.get();
        } catch {
          return null;
        }
      case 'supabase':
        const { data: { session } } = await supabase.auth.getSession();
        return session?.user || null;
      default:
        throw new Error('Invalid provider');
    }
  }

  async loginWithGoogle() {
    switch(this.provider) {
      case 'firebase':
        const googleProvider = new GoogleAuthProvider();
        const result = await signInWithPopup(firebaseAuth, googleProvider);
        return this.serializeUser(result.user);
      case 'supabase':
        throw new Error('Google login not implemented for Supabase');
      case 'appwrite':
        throw new Error('Google login not implemented for Appwrite');
      default:
        throw new Error('Invalid provider');
    }
  }

  async loginWithGithub(provider) {
    switch(provider) {
      case 'firebase':
        const githubProvider = new GithubAuthProvider();
        const result = await signInWithPopup(firebaseAuth, githubProvider);
        return this.serializeUser(result.user);
        
      case 'supabase':
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'github',
          options: {
            redirectTo: window.location.origin + '/auth/callback'
          }
        });
        if (error) throw error;
        return data.user;
        
      case 'appwrite':
        throw new Error('GitHub login not implemented for Appwrite');
        
      default:
        throw new Error('Invalid provider');
    }
  }

  async sendVerificationEmail() {
    switch(this.provider) {
      case 'firebase':
        const user = firebaseAuth.currentUser;
        if (!user) throw new Error('No user found');
        return await sendEmailVerification(user);
      case 'supabase':
      case 'appwrite':
        throw new Error('Not implemented for this provider');
      default:
        throw new Error('Invalid provider');
    }
  }

  async resetPassword(email) {
    switch(this.provider) {
      case 'firebase':
        return await sendPasswordResetEmail(firebaseAuth, email);
      case 'supabase':
      case 'appwrite':
        throw new Error('Not implemented for this provider');
      default:
        throw new Error('Invalid provider');
    }
  }

  async updateEmail(newEmail) {
    switch(this.provider) {
      case 'firebase':
        const user = firebaseAuth.currentUser;
        if (!user) throw new Error('No user found');
        return await verifyBeforeUpdateEmail(user, newEmail);
      default:
        throw new Error('Invalid provider');
    }
  }

  async deleteAccount() {
    switch(this.provider) {
      case 'firebase':
        try {
          const user = firebaseAuth.currentUser;
          if (!user) {
            throw new Error('No user found');
          }

          // Try to delete the user
          try {
            await user.delete();  // Note: using user.delete() not deleteUser(user)
            console.log('User deleted successfully');
            
            // Clear auth state
            await signOut(firebaseAuth);
            localStorage.removeItem('dbProvider');
            return true;
          } catch (error) {
            console.error('Delete error:', error);
            
            // Handle recent authentication requirement
            if (error.code === 'auth/requires-recent-login') {
              // Force sign out and require re-auth
              await signOut(firebaseAuth);
              throw new Error('Please sign in again to delete your account');
            }
            throw error;
          }
        } catch (error) {
          console.error('Delete account error:', error);
          throw error;
        }

      case 'supabase':
        const { error } = await supabase.auth.api.deleteUser(
          (await supabase.auth.getUser()).data.user.id
        );
        if (error) throw error;
        return true;
        
      case 'appwrite':
        try {
          await appwriteAuth.deleteUser();
          return true;
        } catch (error) {
          throw error;
        }
        
      default:
        throw new Error('Invalid provider');
    }
  }

  async softDeleteAccount() {
    switch(this.provider) {
      case 'firebase':
        const user = firebaseAuth.currentUser;
        if (!user) throw new Error('No user found');
        
        const userData = {
          uid: user.uid,
          email: user.email,
          deletedAt: new Date().toISOString(),
          recoveryDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
        };

        await setDoc(doc(db, 'deletedAccounts', user.uid), userData);
        await updateProfile(user, { disabled: true });
        return userData;

      default:
        throw new Error('Invalid provider');
    }
  }

  async recoverAccount(uid) {
    switch(this.provider) {
      case 'firebase':
        const deletedAccount = await db.collection('deletedAccounts').doc(uid).get();

        if (!deletedAccount.exists) {
          throw new Error('Account not found or recovery period expired');
        }

        const data = deletedAccount.data();
        if (new Date(data.recoveryDeadline) < new Date()) {
          throw new Error('Recovery period has expired');
        }

        // Re-enable account
        const user = await firebaseAuth.getUser(uid);
        await user.updateProfile({ disabled: false });
        
        // Remove from deleted accounts
        await db.collection('deletedAccounts').doc(uid).delete();
        return true;

      default:
        throw new Error('Invalid provider');
    }
  }

  async exportUserData() {
    switch(this.provider) {
      case 'firebase':
        const user = firebaseAuth.currentUser;
        if (!user) throw new Error('No user found');

        // Collect user data
        const userData = {
          profile: {
            uid: user.uid,
            email: user.email,
            emailVerified: user.emailVerified,
            displayName: user.displayName,
            photoURL: user.photoURL,
            createdAt: user.metadata.creationTime,
            lastLogin: user.metadata.lastSignInTime
          }
        };

        // Get user's data from Firestore (example)
        const userDocs = await db.collection('userData').where('userId', '==', user.uid).get();

        userData.data = userDocs.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        return userData;

      default:
        throw new Error('Invalid provider');
    }
  }
}

export default AuthProvider; 