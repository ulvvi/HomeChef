import { Prisma, PrismaClient } from "../../generated/prisma/client";
import { fakerPT_BR } from "@faker-js/faker";
import auth from "../../config/auth";

// npm install @faker-js/faker

export async function userSeeder(prisma: PrismaClient, quantidade: number){

	const user:Prisma.UserCreateInput[] = [];

	for (let i = 0; i < quantidade; i++) {
        let password = fakerPT_BR.internet.password();
        let {hash, salt} = auth.generatePassword(password);

		user.push({
			name: fakerPT_BR.internet.username(),
			email: fakerPT_BR.internet.email(),
            hash: hash,
            salt: salt,
		})
	}

	await prisma.user.createMany({
		data:user
	})
}