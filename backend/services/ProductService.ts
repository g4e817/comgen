import BaseService from "./BaseService";
import { Product } from "../../types/Product";
import ProductRepository from "../repositories/ProductRepository";
import { PersistentProduct } from "../../types/Models";

class ProductService extends BaseService {

    productRepository: ProductRepository;

    constructor() {
        super();
        this.productRepository = new ProductRepository();
    }

    public async create(product: Product): Promise<PersistentProduct> {
        try {
            return this.productRepository.create(product);
        } catch (error: any) {
            throw new Error("Error in ProductService.create()" + error.message);
        }
    }

    public async retrieveSingle(productId: string): Promise<PersistentProduct> {
        try {
            const product = this.productRepository.getOne(productId);
            if (!product) {
                throw new Error('Product not found');
            }
            return product
        } catch (error: any) {
            throw new Error("Error in ProductService.retrieveSingle()" + error.message);
        }
    }

    public async retrieveAll(): Promise<PersistentProduct[]> {
        try {
            return this.productRepository.getAll();
        } catch (error: any) {
            throw new Error("Error in ProductService.retrieveAll()" + error.message);
        }
    }

    public async update(productId: string, product: Product): Promise<PersistentProduct> {
        try {
            const productToUpdate = this.productRepository.getOne(productId);

            if (!productToUpdate) {
                throw new Error('Product not found');
            }
            const updatedProduct = {
                ...productToUpdate,
                ...product
            };
            return this.productRepository.update(updatedProduct);
        } catch (error: any) {
            throw new Error("Error in ProductService.update()" + error.message);
        }
    }

    public async delete(productId: string): Promise<boolean> {
        try {
            return this.productRepository.delete(productId);
        } catch (error) {
            throw new Error("Error in TicketService.deleteTicket()");
        }
    }
}


export default ProductService;