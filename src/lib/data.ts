import type { User } from './types';

export const initialUsers: User[] = [
  {
    id: 'a1b2c3d4',
    username: 'guest_user',
    password: 'password123',
    timeout: 1200,
    macAddress: '00:1A:2B:3C:4D:5E',
    uploadLimitBites: 0,
    downloadLimitBites: 0,
  },
  {
    id: 'e5f6g7h8',
    username: 'paulyepes',
    password: 's4rim4n0k',
    timeout: 1200,
    macAddress: 'F8:E0:79:C5:1B:9A',
    uploadLimitBites: 625000,
    downloadLimitBites: 625000,
  },
  {
    id: 'i9j0k1l2',
    username: 'kimberly',
    password: 'murcian0cump10',
    timeout: 4800,
    macAddress: null,
    uploadLimitBites: 0,
    downloadLimitBites: 0,
  },
  {
    id: 'm3n4o5p6',
    username: 'test_account',
    password: 'test_password',
    timeout: 3600,
    macAddress: 'DE:AD:BE:EF:CA:FE',
    uploadLimitBites: 1000000,
    downloadLimitBites: 5000000,
  },
];
