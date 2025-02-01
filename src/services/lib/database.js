class DatabaseService {
  constructor(provider) {
    this.provider = provider;
  }

  async createPost(data) {
    switch(this.provider) {
      case 'firebase':
        return this.firebase.createPost(data);
      case 'appwrite':
        return this.appwrite.createPost(data);
      case 'supabase':
        return this.supabase.createPost(data);
      default:
        throw new Error('Invalid provider');
    }
  }

  async getPosts() {
    switch(this.provider) {
      case 'firebase':
        return this.firebase.getPosts();
      case 'appwrite':
        return this.appwrite.getPosts();
      case 'supabase':
        return this.supabase.getPosts();
      default:
        throw new Error('Invalid provider');
    }
  }
}

export default DatabaseService; 