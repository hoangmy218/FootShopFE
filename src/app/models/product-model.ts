export class Product{
    _id: string;
    ten: string;
    mota: string;
    danhmuc_id: string;
    thuonghieu_id: string;
    dongia: number;

    constructor(){
        this._id = '1';
        this.ten='';
        this.mota = "";
        this.danhmuc_id = '';
        this.thuonghieu_id = '';
        this.dongia = 0;
    }
}