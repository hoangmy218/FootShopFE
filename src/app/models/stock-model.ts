export class Stock{
    _id: string;
    tongnhap: number;
    tongtien: number;
    trangthai: boolean;
    nhacungcap_id: string;
    ngay: string;


    constructor(){
        this._id = '1';
        this.tongnhap=0;
        this.tongtien = 0;
        this.trangthai = false;
        this.nhacungcap_id = '';
        this.ngay = '';
    }
}