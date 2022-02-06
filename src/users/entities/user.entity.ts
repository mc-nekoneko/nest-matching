import { ObjectType, registerEnumType, HideField } from '@nestjs/graphql';
import { Role } from '@prisma/client';

registerEnumType(Role, {
  name: 'Role',
});

@ObjectType()
export class User {
  id: number;
  email: string;
  @HideField()
  password: string;

  firstname?: string;
  lastname?: string;

  role: Role;

  createdAt: Date;
  updatedAt: Date;
}
