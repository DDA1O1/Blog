import DatabaseService from '@lib/database';

const PROVIDER = import.meta.env.VITE_DB_PROVIDER || 'firebase';
const db = new DatabaseService(PROVIDER);

export const blogService = {
  async createPost(post) {
    try {
      return await db.createPost(post);
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  },

  async getPosts() {
    try {
      return await db.getPosts();
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  }
}; 