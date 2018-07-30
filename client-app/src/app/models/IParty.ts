export interface IParty {
    _id?: String ;
    titel?: String ;
    field?: String ;
    numberMax?: Number ;
    currentNumber?: Number ;
    status?: Boolean ;
    timeStart?: String ;
    timeEnd?: String;
    dateStart?: Date;
    idRestaurant?: String;
    listUser?: [{id: String , leader: Boolean}];
    createAt?: Date;
}
