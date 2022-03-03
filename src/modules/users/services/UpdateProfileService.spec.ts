import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      username: 'johndoe',
      password: '123456',
      role: 'admin',
      department: 'Almoxarifado',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Trê',
      username: 'johndoe2',
    });

    expect(updatedUser.name).toBe('John Trê');
    expect(updatedUser.username).toBe('johndoe2');
  });

  it('should not be able to show the profile from non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-user-id',
        name: 'John Trê',
        username: 'johndoe2',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      username: 'johndoe',
      password: '123456',
      role: 'admin',
      department: 'Almoxarifado',
    });

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      username: 'johndoe2',
      password: '123456',
      role: 'admin',
      department: 'Almoxarifado',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Trê',
        username: 'johndoe',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      username: 'johndoe',
      password: '123456',
      role: 'admin',
      department: 'Almoxarifado',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Trê',
      username: 'johndoe',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      username: 'johndoe',
      password: '123456',
      role: 'admin',
      department: 'Almoxarifado',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Trê',
        username: 'johndoe',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      username: 'johndoe',
      password: '123456',
      role: 'admin',
      department: 'Almoxarifado',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Trê',
        username: 'johndoe',
        old_password: 'wrong-old-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
