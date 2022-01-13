/* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    // const alice = await prisma.user.upsert({
    //     where: { email: 'alice@petverso.io' },
    //     update: {},
    //     create: {
    //         email: 'alice@petverso.io',
    //         name: 'Alice',
    //         username: 'User1',
    //         password: '123',
    //         passwordConfirmation: '123',
    //         cpf: '682.821.680-68',
    //         birthday: '12/03/1995',
    //         city: 'Ubiraquara',
    //         state: 'MG',
    //         cep: '73000-000',
    //         phone: '98875-6598',
    //         address1: 'rua do longe',
    //         address2: 'casa 7',
    //     },
    // });

    // const adminuser = await prisma.user.upsert({
    //     where: { email: 'petversoadmin@petverso.io' },
    //     update: {},
    //     create: {
    //         email: 'petversoadmin@petverso.io',
    //         name: 'Petsitter',
    //         username: 'Useradmin',
    //         password: '123pet',
    //         passwordConfirmation: '123pet',
    //         role: 'ADMIN',
    //         cpf: '582.888.210-49',
    //         birthday: '02/07/1990',
    //         city: 'Ubirapora',
    //         state: 'SP',
    //         cep: '73000-000',
    //         phone: '99975-6497',
    //         address1: 'rua do abrigo',
    //         address2: 'casa 8',
    //     },
    // });

    // const biscoitosDaJu = await prisma.company.upsert({
    //     where: { cnpj: '71.997.268/0001-98' },
    //     update: {},
    //     create: {
    //         email: 'biscoitosparadogs@petverso.io',
    //         corporateName: 'Biscoitos da Ju',
    //         username: 'biscoitos',
    //         password: 'nutridoges',
    //         passwordConfirmation: 'nutridoges',
    //         cnpj: '71.997.268/0001-98',
    //         birthday: '19/02/1991',
    //         city: 'Campinas',
    //         state: 'SP',
    //         cep: '73000-000',
    //         phone: '99835-3263',
    //         address1: 'rua do petisco',
    //         address2: 'casa 1',
    //     },
    // // });

    // const acessories = await prisma.category.upsert({
    //     where: { id: 1 },
    //     update: {},
    //     create: { name: 'Dog food' },
    // });

    // const catFood = await prisma.category.upsert({
    //     where: { id: 2 },
    //     update: {},
    //     create: { name: 'Cat food' },
    // });

    // const dogFood = await prisma.category.upsert({
    //     where: { id: 3 },
    //     update: {},
    //     create: { name: 'Dog food' },
    // });

    // const catFood = await prisma.category.upsert({
    //     where: { id: 4 },
    //     update: {},
    //     create: { name: 'Cat food' },
    // });

    // const dogFood = await prisma.category.upsert({
    //     where: { id: 5 },
    //     update: {},
    //     create: { name: 'Dog food' },
    // });

    // const catFood = await prisma.category.upsert({
    //     where: { id: 6 },
    //     update: {},
    //     create: { name: 'Cat food' },
    // });

    // const dogFood = await prisma.category.upsert({
    //     where: { id: 7 },
    //     update: {},
    //     create: { name: 'Dog food' },
    // });

    // const catFood = await prisma.category.upsert({
    //     where: { id: 8 },
    //     update: {},
    //     create: { name: 'Cat food' },
    // });

    // const dogFood = await prisma.category.upsert({
    //     where: { id: 9 },
    //     update: {},
    //     create: { name: 'Dog food' },
    // });

    // const catFood = await prisma.category.upsert({
    //     where: { id: 10 },
    //     update: {},
    //     create: { name: 'Cat food' },
    // });

    // const dogFood = await prisma.category.upsert({
    //     where: { id: 11 },
    //     update: {},
    //     create: { name: 'Dog food' },
    // });

    // const catFood = await prisma.category.upsert({
    //     where: { id: 12 },
    //     update: {},
    //     create: { name: 'Cat food' },
    // });


    console.log(' catFood, dogFood');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
