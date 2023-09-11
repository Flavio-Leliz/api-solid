import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateuseCase } from '../authenticate'

export function makeuAuthenticateUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticateuseCase(prismaUsersRepository)

  return authenticateUseCase
}
