const defaultUser = {
    login: 'Test login',
    pwd: 'a^&s2JH4bnd',
    email: 'test@email.com',
    name: 'Test name',
    surname: 'Test surname',
};

test('Can build UserRecord', () => {
    const user = new UserRecord(defaultUser);

    expect(user.login).toBe('Test login');
    expect(user.pwd).toBe('a^&s2JH4bnd');
    expect(user.email).toBe('test@email.com');
    expect(user.name).toBe('Test name');
    expect(user.surname).toBe('Test surname');
});

test('Can build UserRecord without name provided', () => {
    const userData = defaultUser;
    delete userData.name;
    const user = new UserRecord(userData);

    expect(user).toBeDefined();
    expect(user.name).toBe('');
});

test('Can build UserRecord without surname provided', () => {
    const userData = defaultUser;
    delete userData.surname;
    const user = new UserRecord(userData);

    expect(user).toBeDefined();
    expect(user.surname).toBe('');
});

test('User record won\'t be created when it receives invalid login', () => {
    const message = 'Invalid login, login should have eight characters';

    let userData = defaultUser;
    delete userData.login;
    expect(() => new UserRecord(userData)).toThrow(message);

    userData = {
        ...defaultUser,
        login: 'abc',
    };
    expect(() => new UserRecord(userData)).toThrow(message);
});

test('User record won\'t be created when it receives invalid password', () => {
    const message = 'Invalid password, password should be at least 8 characters long and should contain at least one uppercase, one lowercase and one number';

    let userData = defaultUser;
    delete userData.pwd;
    expect(() => new UserRecord(userData)).toThrow(message);

    userData = {
        ...defaultUser,
        pwd: 'abc',
    };
    expect(() => new UserRecord(userData)).toThrow(message);

    userData = {
        ...defaultUser,
        pwd: 'a!1asczxsdd',
    };
    expect(() => new UserRecord(userData)).toThrow(message);

    userData = {
        ...defaultUser,
        pwd: 'AS23^SSDASSD',
    };
    expect(() => new UserRecord(userData)).toThrow(message);

    userData = {
        ...defaultUser,
        pwd: 'sdsJSBBSjsdb',
    };
    expect(() => new UserRecord(userData)).toThrow(message);
});

test('User record won\'t be created when it receives invalid email', () => {
    const message = 'Invalid email, please enter valid email';

    let userData = defaultUser;
    delete userData.email;
    expect(() => new UserRecord(userData)).toThrow(message);

    userData = {
        ...defaultUser,
        email: 'abc',
    };
    expect(() => new UserRecord(userData)).toThrow(message);
});
