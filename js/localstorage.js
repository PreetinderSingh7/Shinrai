import { TuneScape, User } from "./types.js";

export const saveToLocalStorage = (tuneScapeObj) => {
    if (!tuneScapeObj || !tuneScapeObj instanceof TuneScape) {
        const newInstance = new TuneScape();
        localStorage.setItem('TuneScape', JSON.stringify(newInstance));
        return;
    }
    localStorage.setItem('TuneScape', JSON.stringify(tuneScapeObj));
}

export const getCurrentUser = () => {
    const tuneScapeObj = JSON.parse(localStorage.getItem('TuneScape'));
    if(!tuneScapeObj)
        return undefined;
    return tuneScapeObj.current_user;
}

export const setCurrentUser = (user) => {
    if(!user instanceof User){
        console.error('failed to set user as current_user');
        return;
    }
    const tuneScapeObj = JSON.parse(localStorage.getItem('TuneScape'));
    tuneScapeObj.current_user = user;
    saveToLocalStorage(tuneScapeObj);
}

export const getUser = (username, email) => {
    const tuneScapeObj = JSON.parse(localStorage.getItem('TuneScape'));
    if (!tuneScapeObj) {
        saveToLocalStorage(new TuneScape());
        return; 
    }
    if (!tuneScapeObj instanceof TuneScape) {
        console.log('users format undefined');
        return;
    }
    const user = tuneScapeObj.users.find(user => user.username === username || user.email === email);
    return user;
};

export const createUser = (username, email, password) => {
    if (getUser(username, email)) {
        return false;
    }
    const tuneSpaceObj = JSON.parse(localStorage.getItem('TuneScape'));
    if (!tuneSpaceObj instanceof TuneScape) {
        alert('failed to create new user');
        return false;
    }
    const newUser = new User(username, email, password);
    tuneSpaceObj.users.push(newUser);
    saveToLocalStorage(tuneSpaceObj);
    return true;
}