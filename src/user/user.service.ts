import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_PROVIDER } from 'src/constants/constant';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(@Inject(USER_PROVIDER) private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = await this.userModel.create(createUserDto);
    return createdUser;
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id);
    return user;
  }

  async findOneByName(username: string) {
    const user = await this.userModel.findOne({ username });
    return user;
  }

  async update(id: string, UpdateUserDto: UpdateUserDto) {
    const { username, fullName, email, password } = UpdateUserDto;
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      {
        $set: {
          username,
          fullName,
          email,
          password,
        },
      },
      { new: true },
    );
    return updatedUser;
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndDelete({ _id: id }).exec();
  }
}
