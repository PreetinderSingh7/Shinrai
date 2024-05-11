export class User {
    username;
    email;
    password;
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
}

export class TuneScape {
    current_user = User;
    users = [User]
    constructor() {
        console.log(typeof this.current_user);
        this.current_user = null;
        this.users = [];
    }
}