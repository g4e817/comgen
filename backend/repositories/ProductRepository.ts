import fs from 'fs';
import path from 'path';
import { AbstractRepository } from './AbstractRepository';
import { Product } from '../../types/Product';
import { PersistentProduct } from '../../types/Models';
import { generateUniqueId } from '../../helper';
import { config } from '../config/config';


class ProductRepository implements AbstractRepository<Product, PersistentProduct> {

    public entity = 'products';
    protected dataFolderPath: string;


    constructor() {
        this.dataFolderPath = path.resolve(config.currentWorkingDirectory + `/data/${this.entity}.json`);
    }

    public getOne(id: string): PersistentProduct | undefined {
        const products = this.getAll();

        return products.find(product => product.id === id);
    }

    public getAll(): PersistentProduct[] {
        const productsData = fs.readFileSync(path.join(this.dataFolderPath), 'utf-8');
        const products = JSON.parse(productsData) as PersistentProduct[];
        return products;
    }

    public create(product: Product): PersistentProduct {
        const id = generateUniqueId();
        const newProduct = {
            ...product,
            id,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const products = this.getAll()
        products.push(newProduct);
        fs.writeFileSync(this.dataFolderPath, JSON.stringify(products));
        return newProduct;
    }

    public update(entity: PersistentProduct): PersistentProduct {
        const products = this.getAll();
        const index = products.findIndex(u => u.id === entity.id);
        const updatedProduct = {
            ...entity,
            updatedAt: new Date()
        };

        products[index] = updatedProduct;
        fs.writeFileSync(this.dataFolderPath, JSON.stringify(products));
        return updatedProduct;
    }

    public delete(id: string): boolean {
        const products = this.getAll();
        const index = products.findIndex(u => u.id === id);
        products.splice(index, 1);
        fs.writeFileSync(this.dataFolderPath, JSON.stringify(products));
        return true;
    }
};

export default ProductRepository;