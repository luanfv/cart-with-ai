import { UserEntity } from './user.entity';

describe('UserEntity unit tests', () => {
  describe('WHEN call the UserEntity restore', () => {
    const id = 'user-1';
    const name = 'User Name';
    const email = 'user@email.com';
    const user = UserEntity.restore(id, name, email);

    it('SHOULD restore with correct id', () => {
      expect(user.id).toEqual(id);
    });

    it('SHOULD restore with correct name', () => {
      expect(user.name).toEqual(name);
    });

    it('SHOULD restore with correct email', () => {
      expect(user.email).toEqual(email);
    });
  });
});
