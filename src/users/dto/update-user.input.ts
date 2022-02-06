import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Role } from '@prisma/client';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => Int)
  id: number;
  @Field(() => String)
  email: string;
  @Field(() => String)
  role: Role;
  @Field(() => String)
  firstName: string;
  @Field(() => String)
  lastName: string;
}
