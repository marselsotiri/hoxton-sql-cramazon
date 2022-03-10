import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const items: Prisma.ItemCreateInput[] = [
    {
        image: "tshirt.jpg",
        title: "T-Shirt",
    },
    {
        image: "trousers.jpg",
        title: "Trousers"
    },
    {
        image: "shorts.jpg",
        title: "Shorts"
    }
]
const users: Prisma.UserCreateInput[] = [
    {
        email: "marsel@email.com",
        name: "Marsel",
        orders: {
            create: [
                { item: { connect: { title: 'T-Shirt' } }, quantity: 100 },
                { item: { connect: { title: 'Shorts' } }, quantity: 50 },
                { item: { connect: { title: 'Trousers' } }, quantity: 20 }
            ]
        }
    },
    {
        email: "aldo@email.com",
        name: "Aldo",
        orders: {
            create: [
                {
                    item: {
                        connectOrCreate: {
                            where: { title: 'Shoes' },
                            create: { image: 'shoes.jpg', title: 'Shoes' }
                        }
                    },
                    quantity: 39
                }
            ]
        }
    },
    {
        email: "ben@email.com",
        name: "Ben",
        orders: {
            create: [
                { item: { connect: { title: 'T-Shirt' } }, quantity: 60 },
                { item: { connect: { title: 'Shorts' } }, quantity: 54 },
                { item: { connect: { title: 'Trousers' } }, quantity: 14 }
            ]
        }
    }
]

async function createStuff(){
    for (const item of items){
        await prisma.item.create({data: item})
    }

    for (const user of users){
        await prisma.user.create({data: user})
    }
}

createStuff()