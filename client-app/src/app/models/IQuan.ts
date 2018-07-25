export interface IQuan {
    _id?: string;
    name: string;
    typeFood?: string;
    minPrices?: string;
    maxPrices?: string;
    timeStart?: string;
    timeAnd?: string;
    address?: string;
    lat?: Number;
    long?: Number;
    detail?: string;
    image?: [{image: string}];
    listRate?: [{
        idUser: String,
        rate: Number
    }];
    averageRate?: Number;
}
