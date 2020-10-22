import { CartItem } from './cart-item-model';

export class OrderForm{
    _id: string;
    thanhtoan_id: string;
    vanchuyen_id: string;
    diachi_id: string;
    ghichu: string;
    sanpham : CartItem[];

    constructor(){
        this._id = '';
        this.thanhtoan_id = '';
        this.vanchuyen_id = '';
        this.diachi_id = '';
        this.ghichu='';
        this.sanpham = [];
        }
}