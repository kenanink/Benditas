class User {
  constructor({ id, name, email, password, role }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role || 'cliente';
  }
}

module.exports = User;
