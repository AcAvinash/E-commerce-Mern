import {
    OrderProduct,
    OrderProductsEntity,
    OrderResponseView,
    OrderServerResponseView
} from "../../modules/orders/models/OrderResponseView";

export class OrderReduxService {

    public static convertToNewOrderResponseView(orderProducts: OrderProductsEntity[]): OrderProduct[] {
        return orderProducts.map((item) => {
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
    }

    public static convertToNewOrderResponseArray(serverOrders: OrderServerResponseView[]): OrderResponseView[] {
        return serverOrders.map(serverOrder => {
            return {
                _id: serverOrder._id,
                products: this.convertToNewOrderResponseView(serverOrder.products),
                total: serverOrder.total,
                tax: serverOrder.tax,
                grandTotal: serverOrder.grandTotal,
                paymentType: serverOrder.paymentType,
                orderStatus: serverOrder.orderStatus,
                orderBy: serverOrder.orderBy,
                createdAt: serverOrder.createdAt,
                updatedAt: serverOrder.updatedAt,
                __v: serverOrder.__v
            }
        });
    }
}