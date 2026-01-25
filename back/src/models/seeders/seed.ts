import { Prisma } from '../../config/db';
import { userSeeder } from './userSeeder';


async function main() {
	await Prisma.$connect();

	await userSeeder(Prisma,20);

	await Prisma.$disconnect();

}

main()
	.then(async () => {
		await Prisma.$disconnect();
	})
	.catch(async (e: any) => {
		console.log(e);
		await Prisma.$disconnect();
		process.exit(1);
	});



	