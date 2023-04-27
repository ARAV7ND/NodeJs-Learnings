const products = [];

module.exports = class Product{
    
    constructor(name){
        this.name = name;
    }

    save(){
        products.push(this);
    }

    static fetchAll(){
        return products;
    }
}