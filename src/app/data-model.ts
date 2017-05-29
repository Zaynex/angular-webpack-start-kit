export class Hero {
    id = 0;
    name = '';
    addresses: Address[];
}
export class Address {
    street = '';
    city = '';
    state = '';
    zip = '';
}

export const heroes: Hero[] = [
    {
        id: 2,
        name: 'zaynex',
        addresses: [{
            street: '111',city: 'hz', state:'ok', zip: '226'
        }]
    },
    {
        id: 3,
        name: 'otyn',
        addresses: [{
            street: '111',city: 'hz', state:'ok', zip: '226'
        }]
    },
];

export const states = ['ok', 'bad', 'terr'];