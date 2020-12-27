const users: User[] = [{
    name: 'Av',
    avatarColor: '#7DD3D0'
}, {
    name: 'Ta',
    avatarColor: '#D575A8',
}, {
    name: 'Ki',
    avatarColor: '#7BB2F4',
}]

export function getRandomUser() {
    const randomIndex = Math.floor(Math.random() * Math.floor(3));
    return users[randomIndex];
}