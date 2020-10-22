export class OrderItem{
    _id: string;
    khuyenmai: number;
    ctsp_id: string;
    donhang_id: string;
    soluongdat: number;
    dongia: number;

    constructor(){
        this._id = '1';
        this.khuyenmai= 0;
        this.ctsp_id = '';
        this.donhang_id = '';
        this.soluongdat = 1
        this.dongia = 1000;
    }
}

