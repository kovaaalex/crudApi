// userService.ts
interface User {
    id: string;
    username: string;
    age: number;
    hobbies: string[];
}

let users: User[] = [];

export function getUsers(): User[] {
    return users;
}

export function getUserById(id: string): User | undefined {
    return users.find(user => user.id === id);
}

export function createUser(user: User): User {
    users.push(user);
    return user;
}

export function updateUser(id: string, updated: Partial<User>): User | undefined {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updated };
        return users[userIndex];
    }
    return undefined;
}

export function deleteUser(id: string): boolean {
    const initialLength = users.length
    users = users.filter(user => user.id !== id)
    return users.length < initialLength
}