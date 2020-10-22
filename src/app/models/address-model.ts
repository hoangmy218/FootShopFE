export class Address{
    _id: string;
    macdinh: boolean;
    ten: string;
    dienthoai: string;
    diachi: string;
    nguoidung_id: string;


    constructor(){
        this._id = '1';
        this.macdinh= false;
        this.ten = '';
        this.dienthoai = '';
        this.diachi = '';
        this.nguoidung_id = '';
    }
}