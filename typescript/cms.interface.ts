// Create Product  Interface
export interface ICreateProductRequest
{
    name: string;
    price: string;
    description: string;
    category: string;
}

// Create Product  Interface
export interface CreateProductResponse
{
    status: boolean;
    message?: string;
    data?: {
        id: string;
        name: string;
        price: string;
        description: string;
        category: string;
        createdAt: string;
        updatedAt: string;
    };
}

//  Product List  Interface
export interface GetProductListResponse
{
    status: boolean;
    message?: string;
    data?: {
        products: {
            id: string;
            name: string;
            price: string;
            description: string;
            category: string;
            createdAt: string;
            updatedAt: string;
        }[];
    };
}

//  Product Details (Edit)  Interface
export interface GetProductDetailsResponse
{
    status: boolean;
    message?: string;
    data?: {
        id: string;
        name: string;
        price: string;
        description: string;
        category: string;
        createdAt: string;
        updatedAt: string;
    };
}

// Update Product  Interface
export interface IUpdateProductRequest
{
    name: string;
    price: string;
    description: string;
    category: string;
}

// Update Product  Interface
export interface UpdateProductResponse
{
    status: boolean;
    message?: string;
    data?: {
        id: string;
        name: string;
        price: string;
        description: string;
        category: string;
        createdAt: string;
        updatedAt: string;
    };
}

// Delete Product  Interface
export interface DeleteProductResponse
{
    status: boolean;
    message?: string;
    data?: {
        id: string;
        message: string;
    };
}