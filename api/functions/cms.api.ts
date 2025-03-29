import axiosInstance from "../axios/axios";
import { endPoints } from "../endPoints/endPoints";
import { MutationFunction } from "@tanstack/react-query";
import { ICreateProductRequest, CreateProductResponse, GetProductListResponse, GetProductDetailsResponse, IUpdateProductRequest, UpdateProductResponse, DeleteProductResponse, } from "@/typescript/cms.interface";

// Create Product
export const createProductFn: MutationFunction<CreateProductResponse, ICreateProductRequest> = async ( payload ) =>
{
  const response = await axiosInstance.post<CreateProductResponse>( endPoints.cms.create, payload );
  console.log( "Create Product response:", response );
  return response.data;
};

//  Product List
export const getProductListFn = async (): Promise<GetProductListResponse> =>
{
  const response = await axiosInstance.get( endPoints.cms.product_list );
  console.log( "Get Product List response:", response );
  return {
    status: response.data.status,
    message: response.data.message,
    data: {
      products: response.data.product.map( ( product: any ) => ( {
        id: product._id,
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      } ) ),
    },
  };
};

//  Product Details (Edit)
export const getProductDetailsFn = async ( id: string ): Promise<GetProductDetailsResponse> =>
{
  const response = await axiosInstance.get( `${ endPoints.cms.edit }/${ id }` );
  console.log( "Get Product Details response:", response );
  return {
    status: response.data.status,
    message: response.data.message,
    data: {
      id: response.data.product._id,
      name: response.data.product.name,
      price: response.data.product.price,
      description: response.data.product.description,
      category: response.data.product.category,
      createdAt: response.data.product.createdAt,
      updatedAt: response.data.product.updatedAt
    }
  };
};

// Update Product
export const updateProductFn: MutationFunction<UpdateProductResponse, IUpdateProductRequest & { id: string }> = async ( payload ) =>
{
  const { id, ...data } = payload;
  const response = await axiosInstance.put<UpdateProductResponse>( `${ endPoints.cms.update }/${ id }`, data );
  console.log( "Update Product response:", response );
  return response.data;
};

// Delete Product
export const deleteProductFn = async ( id: string ): Promise<DeleteProductResponse> =>
{
  await axiosInstance.delete( `${ endPoints.cms.delete }/${ id }` );

  return {
    status: true,
    message: "Product deleted successfully",
    data: {
      id: id,
      message: "Product deleted successfully"
    }
  };
};