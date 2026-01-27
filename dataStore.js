import fs from 'fs/promises';
import path from 'path';

const dataFile = path.join(process.cwd(), 'users.json');

const defaultUsers = [
  { id: 1, firstName: 'Sinethemba', lastName: 'Nkosi', age: 24 },
  { id: 2, firstName: 'John', lastName: 'Kings', age: 28 }
];

export async function readUsers() {
  try {
    const raw = await fs.readFile(dataFile, 'utf8');
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    if (parsed && typeof parsed === 'object') return [parsed];
    return defaultUsers;
  } catch (err) {
    return defaultUsers;
  }
}

export async function writeUsers(users) {
  const data = JSON.stringify(users, null, 2);
  await fs.writeFile(dataFile, data, 'utf8');
}
    