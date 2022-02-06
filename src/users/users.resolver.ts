import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { User as UserModel } from '@prisma/client';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') data: CreateUserInput,
  ): Promise<UserModel> {
    return this.usersService.create({
      email: data.email,
      password: '',
      role: 'GEMERAL',
      firstName: '',
      lastName: '',
    });
  }

  @Query(() => [User], { name: 'users' })
  async findAll(): Promise<UserModel[]> {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  async findById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<UserModel> {
    return this.usersService.findOne({ id });
  }

  @Query(() => User, { name: 'user' })
  async findByEmail(
    @Args('email', { type: () => String }) email: string,
  ): Promise<UserModel> {
    return this.usersService.findOne({ email });
  }

  @Mutation(() => User)
  async updateUser(
    @Args('updateUserInput') data: UpdateUserInput,
  ): Promise<UserModel> {
    return this.usersService.update({
      where: { id: data.id },
      data: {
        email: data.email,
        role: data.role,
        firstName: data.firstName,
        lastName: data.lastName,
      },
    });
  }

  @Mutation(() => User)
  async deleteIser(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<UserModel> {
    return this.usersService.delete({ id });
  }
}
