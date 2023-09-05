import {ProductResponseView} from "../../modules/products/models/ProductResponseView";
import {
    CartNEWResponseView,
    CartResponseView,
    ProductsEntity,
    TheProduct
} from "../../modules/cart/models/CartResponseView";
import {ToastUtil} from "../../util/ToastUtil";

export class CartReduxService {

    private static PRODUCT_TAX: number = 5.0;

    public static convertToTheProductEntity(product: ProductResponseView): TheProduct {
        return {
            _id: product._id,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity: product.quantity,
            brand: product.brand,
            sold: product.sold,
            categoryObj: product.categoryObj._id,
            subCategoryObj: product.subCategoryObj._id,
            title: product.title,
            description: product.description,
            userObj: product.userObj._id,
            count: product.count
        }
    }

    public static addToCartUtil(cart: CartNEWResponseView, product: TheProduct, count: number): CartNEWResponseView {

        const existingProduct: TheProduct | undefined = cart.products && cart.products.find(item => item._id === product._id);
        if (existingProduct) {
            ToastUtil.displayErrorToast("Item already exists in Cart")
            return cart;
        } else {
            ToastUtil.displaySuccessToast("Item added to Cart")
            return {
                ...cart,
                products: [...cart.products, {...product, count: count}]
            };
        }
    }

    public static incrementProductQtyUtil(cart: CartNEWResponseView, productId: string): CartNEWResponseView {
        return {
            ...cart,
            products: cart.products.map(product => {
                if (product._id === productId) {
                    return {
                        ...product,
                        count: product.count + 1,
                        price: product.price
                    }
                }
                return product;
            })
        }
    }

    public static decrementProductQtyUtil(cart: CartNEWResponseView, productId: string): CartNEWResponseView {
        return {
            ...cart,
            products: cart.products.map(product => {
                if (product._id === productId) {
                    return {
                        ...product,
                        count: product.count - 1 > 0 ? product.count - 1 : 1,
                        price: product.price
                    }
                }
                return product;
            })
        }
    }

    public static deleteProductItemUtil(cart: CartNEWResponseView, productId: string): CartNEWResponseView {
        ToastUtil.displayInfoToast("Product is Deleted from Cart");
        return {
            ...cart,
            products: cart.products.filter(product => product._id !== productId)
        }
    }

    public static calculateTotal(products: TheProduct[]): number {
        let total: number = 0;
        for (let product of products) {
            total += Number(product.price) * Number(product.count);
        }
        return total;
    }

    public static calculateTax(products: TheProduct[]): number {
        const total = this.calculateTotal(products);
        return total * this.PRODUCT_TAX / 100;
    }

    public static calculateGrandTotal(products: TheProduct[]): number {
        return this.calculateTotal(products) + this.calculateTax(products);
    }

    public static convertToProductNewResponseView = (products: ProductsEntity[]): TheProduct[] => {
        return products.map((item) => {
            return {
                _id: item.product._id,
                title: item.product.title,
                description: item.product.description,
                imageUrl: item.product.imageUrl,
                brand: item.product.brand,
                price: item.product.price,
                quantity: item.product.quantity,
                sold: item.product.sold,
                userObj: item.product.userObj,
                categoryObj: item.product.categoryObj,
                subCategoryObj: item.product.subCategoryObj,
                createdAt: item.product.createdAt,
                updatedAt: item.product.updatedAt,
                count: item.count,
            }
        });
    };
}