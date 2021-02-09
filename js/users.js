import storageService from "./storage-service.js";

class UsersList {
  constructor(users) {
    this.users = users;
  }

  addUser(newUser) {
    const existingUser = this.getUserByUsername(newUser.username);

    if (existingUser) {
      throw new Error('User with email already exists.');
    }

    this.users = [...this.users, newUser];
  }

  getUserByUsername(username) {
    return this.users.find(newUser => newUser.username === username);
  }

}

const users = JSON.parse(storageService.get('Users'));

const usersList = new UsersList(users || []);

export default usersList;