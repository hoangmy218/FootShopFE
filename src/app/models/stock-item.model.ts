export class StockItem{
    _id: string;
    sanpham_id: string;
    mausac_id: string;
    kichco_id: string;
    soluongnhap: number;
    dongianhap: number;


    constructor(){
        this._id = '';
        this.sanpham_id='';
        this.mausac_id = '';
        this.kichco_id = '';
        this.soluongnhap = 1;
        this.dongianhap = 1000;
    }
}