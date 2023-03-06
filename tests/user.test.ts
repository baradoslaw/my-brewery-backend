// Tests for UserRecord (fetures required connection with database)
// Password to testing entry in db: test
//@TODO: When insert and delete methods will be finished replace plain data in tests with some data, that will be dynamically added and removed only for tests
import {pool} from "../utils/db";
import {defaultUser} from "./data/default-user";

afterAll(async () => {
    await pool.end();
});

test('UserRecord.getOne returns data from database for one entry.', async () => {
    const user = await UserRecord.getOne('Testing')

    expect(user.id).toBe('a9a0c57b-6cfa-46a9-b957-af5ccd21cdda');
    expect(user.login).toBe('Testing');
    //@TODO: When method for comparing hashes will be finished add test to check password for testing entry
    expect(user.email).toBe('testing@abc.com');
    expect(user.name).toBe('Tester');
    expect(user.surname).toBe('Human');
});

test('UserRecord.getOne returns null from database for unexisting entry.', async () => {
    const user = await UserRecord.getOne('!!!!');

    expect(user).toBeNull();
});

test('UserRecord.findAll returns array of found entries.', async () => {
    const users = await UserRecord.findAll('Test');

    expect(users[0].id).toBeDefined();
    expect(users[1].id).toBeDefined();
});

test('UserRecord.findAll returns empty array when searching for something that does not exists.', async () => {
    const users = await UserRecord.findAll('!!!!!');

    expect(users).toEqual([]);
});

test('UserRecord.insert properly inserts data to database', async () => {
    const user = new UserRecord(defaultUser);
    await user.insert();

    expect(typeof user.id).toBe('string');
    expect(user.id.length).toBe(36);
});
