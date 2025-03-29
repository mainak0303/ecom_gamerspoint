import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "@tanstack/react-query";
import { useGlobalHooks } from "../globalHooks/globalHooks";
import toast from "react-hot-toast";
import { createProductFn, getProductListFn, getProductDetailsFn, updateProductFn, deleteProductFn, } from "@/api/functions/cms.api";
import { CreateProductResponse, GetProductListResponse, GetProductDetailsResponse, UpdateProductResponse, DeleteProductResponse, ICreateProductRequest, IUpdateProductRequest, } from "@/typescript/cms.interface";
import Swal from 'sweetalert2';

// Create Product Mutation
export const createProductMutation = (): UseMutationResult<CreateProductResponse, unknown, ICreateProductRequest> =>
{
    const { queryClient } = useGlobalHooks();
    return useMutation<CreateProductResponse, unknown, ICreateProductRequest>( {
        mutationFn: createProductFn,
        onSuccess: ( res ) =>
        {
            const { status, message } = res || {};
            if ( status )
            {
                toast.success( message || "Product created successfully!" );
            } else
            {
                toast.error( message || "Failed to create product." );
            }
            queryClient.invalidateQueries( { queryKey: [ "PRODUCT_LIST" ] } );
        },
        onError: ( error: any ) =>
        {
            toast.error( "Failed to create product. Please try again." );
            queryClient.invalidateQueries( { queryKey: [ "PRODUCT_LIST" ] } );
        },
    } );
};

//  Product List Query
export const useProductListQuery = (): UseQueryResult<GetProductListResponse, unknown> =>
{
    return useQuery( {
        queryKey: [ "PRODUCT_LIST" ],
        queryFn: getProductListFn,
        
    } );
};

//  Product Details 

export const useProductDetailsQuery = (id: string) => {
    return useQuery({
        queryKey: ["PRODUCT_DETAILS", id],
        queryFn: async () => {
            const response = await getProductDetailsFn(id);
            return response;
        },
        
    });
};

// Update Product Mutation
export const updateProductMutation = (): UseMutationResult<UpdateProductResponse, unknown, IUpdateProductRequest & { id: string }> =>
{
    const { queryClient } = useGlobalHooks();
    return useMutation<UpdateProductResponse, unknown, IUpdateProductRequest & { id: string }>( {
        mutationFn: updateProductFn,
        onSuccess: ( res ) =>
        {
            const { status, message } = res || {};
            if ( status )
            {
                toast.success( message || "Product updated successfully!" );
            } else
            {
                toast.error( message || "Failed to update product." );
            }
            queryClient.invalidateQueries( { queryKey: [ "PRODUCT_LIST", "PRODUCT_DETAILS" ] } );
        },
        onError: ( error: any ) =>
        {
            toast.error( "Failed to update product. Please try again." );
            queryClient.invalidateQueries( { queryKey: [ "PRODUCT_LIST", "PRODUCT_DETAILS" ] } );
        },
    } );
};

// Delete Product Mutation
export const deleteProductMutation = (): UseMutationResult<DeleteProductResponse, unknown, string> =>
{
    const { queryClient } = useGlobalHooks();
    return useMutation<DeleteProductResponse, unknown, string>( {
        mutationFn: deleteProductFn,
        onSuccess: ( res ) =>
        {
            Swal.fire(
                'Deleted!',
                res.message || 'Product deleted successfully!',
                'success'
            );
            queryClient.invalidateQueries( { queryKey: [ "PRODUCT_LIST" ] } );
        },
        onError: ( error: any ) =>
        {
            Swal.fire(
                'Error!',
                'Failed to delete product. Please try again.',
                'error'
            );
        },
    } );
};