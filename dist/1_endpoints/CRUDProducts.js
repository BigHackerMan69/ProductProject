class CRUDProduct {
    // Slags database men vi skal bruge Redis i stedet
    static products = new Map();
    static size = 0;
    constructor() {
        CRUDProduct.products.set(1, { 'title': 'milk', 'decription': 'dairy product', 'price': 14 });
        CRUDProduct.size++;
    }
    static async insert(request, response) {
        try {
            const product = request.body;
            console.log("titel=" + product.title);
            // NOT SECURE
            if (product.role !== 'admin')
                return response.status(401).json("Not authorized");
            let no = CRUDProduct.size + 1; // next
            CRUDProduct.products.set(no, product);
            return response.status(201).json(product);
        }
        catch (e) {
            console.error(e);
        }
    }
}
export { CRUDProduct };
//# sourceMappingURL=CRUDProducts.js.map