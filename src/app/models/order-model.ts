export class Order{
    _id: string;
    nguoidung_id: string;
    thanhtoan_id: string;
    vanchuyen_id: string;
    diachi_id: string;
    ngaydat: string;
    ghichu: string;
    trangthai: number;
    tongtien: number;

    constructor(){
        this._id = '1';
        this.nguoidung_id='';
        this.thanhtoan_id = '';
        this.vanchuyen_id = '';
        this.diachi_id = '';
        this.ngaydat = '';
        this.ghichu = '';
        this.trangthai = 1;
        this.tongtien = 1000;
    }
}