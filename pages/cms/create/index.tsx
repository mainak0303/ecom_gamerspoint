import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper, Grid, Avatar, IconButton } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router";
import { ICreateProductRequest } from "@/typescript/cms.interface";
import Loader from "@/layouts/header/Loader";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { keyframes } from "@emotion/react";
import { createProductMutation } from "@/customHooks/query/cms.query.hooks."; 


const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const CreateProductPage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateProductRequest>({
    defaultValues: {
      name: "",
      price: "",
      description: "",
      category: "",
    },
  });

  
  const { mutate, isPending } = createProductMutation();

  const onSubmit = (data: ICreateProductRequest) => {
    mutate(data, {
      onSuccess: (res) => {
        const { status } = res || {};
        if (status) {
          setLoading(true); 
          setTimeout(() => {
            router.push("/cms/list"); 
          }, 2000);
        }
      },
    });
  };

  return (
    <>
      {/* Show loader when loading */}
      {(isPending || loading) && <Loader />}

      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(to right, #ffcccc, #ff6666)",
        }}
      >
        <Paper
          elevation={10}
          sx={{
            padding: 6,
            width: 400,
            borderRadius: 3,
            background: "white",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
            animation: `${fadeIn} 1s ease-out`,
          }}
        >
          <Box textAlign="center">
            <Avatar sx={{ background: "#d32f2f", margin: "0 auto", width: 56, height: 56 }}>
              <AddCircleOutlineIcon fontSize="large" />
            </Avatar>
            <Typography
              variant="h4"
              sx={{ margin: "20px 0", color: "#d32f2f", fontWeight: "bold" }}
            >
              Create Product
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Fill in the details to create a new product.
            </Typography>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Product Name Field */}
            <Controller
              name="name"
              control={control}
              rules={{ required: "Product name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Product Name"
                  placeholder="Enter product name"
                  fullWidth
                  margin="normal"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  sx={{ mb: 3 }}
                  disabled={isPending || loading}
                />
              )}
            />

            {/* Product Price Field */}
            <Controller
              name="price"
              control={control}
              rules={{ required: "Product price is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Product Price"
                  placeholder="Enter product price"
                  fullWidth
                  margin="normal"
                  error={!!errors.price}
                  helperText={errors.price?.message}
                  sx={{ mb: 3 }}
                  disabled={isPending || loading}
                />
              )}
            />

            {/* Product Description Field */}
            <Controller
              name="description"
              control={control}
              rules={{ required: "Product description is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Product Description"
                  placeholder="Enter product description"
                  fullWidth
                  margin="normal"
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  sx={{ mb: 3 }}
                  disabled={isPending || loading}
                />
              )}
            />

            {/* Product Category Field */}
            <Controller
              name="category"
              control={control}
              rules={{ required: "Product category is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Product Category"
                  placeholder="Enter product category"
                  fullWidth
                  margin="normal"
                  error={!!errors.category}
                  helperText={errors.category?.message}
                  sx={{ mb: 3 }}
                  disabled={isPending || loading}
                />
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                margin: "20px 0",
                background: "#d32f2f",
                color: "#fff",
                fontWeight: "bold",
                "&:hover": { background: "#b71c1c" },
                py: 1.5,
                fontSize: "1rem",
              }}
              disabled={isPending || loading}
              startIcon={
                isPending ? (
                  <IconButton sx={{ animation: `${spin} 1s linear infinite` }}>
                    <AddCircleOutlineIcon />
                  </IconButton>
                ) : null
              }
            >
              {isPending || loading ? "Creating..." : "Create Product"}
            </Button>
          </form>
        </Paper>
      </Grid>
    </>
  );
};

export default CreateProductPage;