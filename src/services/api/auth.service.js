import AuthProvider from '@lib/auth';

export const authService = {
  async login(email, password, provider) {
    try {
      const auth = new AuthProvider(provider);
      return await auth.login(email, password);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  async signup(email, password, provider) {
    try {
      const auth = new AuthProvider(provider);
      return await auth.signup(email, password);
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  },

  async logout() {
    try {
      const provider = localStorage.getItem('dbProvider') || 'firebase';
      const auth = new AuthProvider(provider);
      return await auth.logout();
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  async getCurrentUser() {
    try {
      const provider = localStorage.getItem('dbProvider') || 'firebase';
      const auth = new AuthProvider(provider);
      return await auth.getCurrentUser();
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  },

  async loginWithGoogle(provider) {
    try {
      const auth = new AuthProvider(provider);
      return await auth.loginWithGoogle();
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  },

  async sendVerificationEmail() {
    try {
      const provider = localStorage.getItem('dbProvider') || 'firebase';
      const auth = new AuthProvider(provider);
      return await auth.sendVerificationEmail();
    } catch (error) {
      console.error('Send verification email error:', error);
      throw error;
    }
  },

  async resetPassword(email) {
    try {
      const provider = localStorage.getItem('dbProvider') || 'firebase';
      const auth = new AuthProvider(provider);
      return await auth.resetPassword(email);
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  },

  async deleteAccount() {
    try {
      const provider = localStorage.getItem('dbProvider') || 'firebase';
      const auth = new AuthProvider(provider);
      return await auth.deleteAccount();
    } catch (error) {
      console.error('Delete account error:', error);
      throw error;
    }
  },

  async softDeleteAccount() {
    try {
      const provider = localStorage.getItem('dbProvider') || 'firebase';
      const auth = new AuthProvider(provider);
      return await auth.softDeleteAccount();
    } catch (error) {
      console.error('Soft delete account error:', error);
      throw error;
    }
  },

  async recoverAccount(uid) {
    try {
      const provider = localStorage.getItem('dbProvider') || 'firebase';
      const auth = new AuthProvider(provider);
      return await auth.recoverAccount(uid);
    } catch (error) {
      console.error('Account recovery error:', error);
      throw error;
    }
  },

  async exportUserData() {
    try {
      const provider = localStorage.getItem('dbProvider') || 'firebase';
      const auth = new AuthProvider(provider);
      return await auth.exportUserData();
    } catch (error) {
      console.error('Data export error:', error);
      throw error;
    }
  },

  async loginWithGithub(provider) {
    try {
      const auth = new AuthProvider(provider);
      return await auth.loginWithGithub(provider);
    } catch (error) {
      console.error('Github login error:', error);
      throw error;
    }
  }
};
