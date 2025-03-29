import React, { useState } from "react";
import {   Box,   Button,  Typography,   Paper,   Grid,   CircularProgress,   Switch,   FormControlLabel,  TextField,  IconButton,  InputAdornment} from "@mui/material";
import { useRouter } from "next/router";
import { keyframes } from "@emotion/react";
import Loader from "@/layouts/header/Loader";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import { useProductListQuery, deleteProductMutation } from "@/customHooks/query/cms.query";
import Swal from 'sweetalert2';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;
const scaleUp = keyframes`
  from { transform: scale(1); }
  to { transform: scale(1.03); }
`;
const shadowHover = keyframes`
  from { box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
  to { box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); }
`;
const buttonHover = keyframes`
  from { 
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  to { 
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;
const ProductListPage: React.FC = () => {
  const router = useRouter();
  const [isGridLayout, setIsGridLayout] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const { data, isLoading, isError, refetch } = useProductListQuery();
  const deleteMutation = deleteProductMutation();
  const products = data?.data?.products || [];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = parseFloat(a.price);
    const priceB = parseFloat(b.price);
    return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
  });

  const handleViewDetails = (id: string) => {
    router.push(`/cms/details/${id}`);
  };

  const handleEdit = (id: string) => {
    router.push(`/cms/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d32f2f',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id, {
          onSuccess: () => {
            refetch();
          }
        });
      }
    });
  };

  if (isError) {
    return (
      <Box textAlign="center" py={10}>
        <Typography variant="h6" color="error">
          Failed to load products. Please try again later.
        </Typography>
        <Button
          variant="contained"
          color="error"
          sx={{ mt: 2 }}
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <>
      {isLoading && <Loader />}
      <Grid container justifyContent="center" alignItems="center" sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #ffcccc, #ff6666)",
        py: 4
      }}>
        <Paper elevation={10} sx={{
          padding: 6,
          width: "90%",
          maxWidth: 1200,
          borderRadius: 3,
          background: "white",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
          animation: `${fadeIn} 1s ease-out`,
        }}>
          <Box textAlign="center">
            <Typography variant="h4" sx={{ margin: "20px 0", color: "#d32f2f", fontWeight: "bold" }}>
              Product List
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              List of all products.
            </Typography>

            <FormControlLabel
              control={
                <Switch
                  checked={isGridLayout}
                  onChange={() => setIsGridLayout(!isGridLayout)}
                  color="primary"
                />
              }
              label={isGridLayout ? "Grid Layout" : "List Layout"}
            />
          </Box>
          {/* Search and Sort Controls */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <TextField
              placeholder="Search products..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                width: 300,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />
            <Button
              variant="outlined"
              startIcon={<SortIcon />}
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              sx={{
                color: '#d32f2f',
                borderColor: '#d32f2f',
                '&:hover': {
                  borderColor: '#b71c1c',
                }
              }}
            >
              Sort by Price ({sortOrder === 'asc' ? 'Low to High' : 'High to Low'})
            </Button>
          </Box>
          {sortedProducts.length === 0 ? (
            <Box textAlign="center" py={4}>
              <Typography variant="h6" color="textSecondary">
                No products found
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{ mt: 1, mb: 3 }}>
                {searchTerm ? 'No products match your search.' : 'You haven\'t added any products yet.'}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  background: "#d32f2f",
                  color: "#fff",
                  fontWeight: "bold",
                  "&:hover": {
                    background: "#b71c1c",
                    animation: `${buttonHover} 0.3s ease forwards`
                  },
                  py: 1.5,
                  fontSize: "1rem",
                  transition: 'all 0.3s ease'
                }}
                onClick={() => router.push("/cms/create")}
              >
                Add Your First Product
              </Button>
            </Box>
          ) : (
            <>
              {isGridLayout ? (
                <Grid container spacing={4}>
                  {sortedProducts.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                      <Paper
                        elevation={3}
                        sx={{
                          padding: 2,
                          textAlign: "center",
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            animation: `${scaleUp} 0.3s ease forwards, ${shadowHover} 0.3s ease forwards`,
                            cursor: 'pointer',
                            backgroundColor: 'rgba(255, 255, 255, 0.9)'
                          }
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            mb: 2,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              color: '#d32f2f',
                              transform: 'translateY(-2px)'
                            }
                          }}
                        >
                          {product.name}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                          Price: {product.price}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                          Category: {product.category}
                        </Typography>
                        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                          <Button
                            variant="contained"
                            startIcon={<VisibilityIcon />}
                            onClick={() => handleViewDetails(product.id)}
                            sx={{
                              background: "#d32f2f",
                              "&:hover": {
                                background: "#b71c1c",
                                animation: `${buttonHover} 0.3s ease forwards`
                              },
                              transition: 'all 0.3s ease'
                            }}
                          >
                            Details
                          </Button>
                          <Button
                            variant="contained"
                            startIcon={<EditIcon />}
                            onClick={() => handleEdit(product.id)}
                            sx={{
                              background: "#d32f2f",
                              "&:hover": {
                                background: "#b71c1c",
                                animation: `${buttonHover} 0.3s ease forwards`
                              },
                              transition: 'all 0.3s ease'
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            startIcon={<DeleteIcon />}
                            onClick={() => handleDelete(product.id)}
                            sx={{
                              background: "#d32f2f",
                              "&:hover": {
                                background: "#b71c1c",
                                animation: `${buttonHover} 0.3s ease forwards`
                              },
                              transition: 'all 0.3s ease'
                            }}
                            disabled={deleteMutation.isPending}
                          >
                            {deleteMutation.isPending ? (
                              <CircularProgress size={24} color="inherit" />
                            ) : (
                              "Delete"
                            )}
                          </Button>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Box>
                  {sortedProducts.map((product) => (
                    <Paper
                      key={product.id}
                      elevation={3}
                      sx={{
                        padding: 2,
                        mb: 2,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          animation: `${scaleUp} 0.3s ease forwards, ${shadowHover} 0.3s ease forwards`,
                          cursor: 'pointer',
                          backgroundColor: 'rgba(255, 255, 255, 0.9)'
                        }
                      }}
                    >
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              color: '#d32f2f',
                              transform: 'translateY(-2px)'
                            }
                          }}
                        >
                          {product.name}
                        </Typography>
                        <Typography variant="body1">Price: {product.price}</Typography>
                        <Typography variant="body2">Category: {product.category}</Typography>
                      </Box>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <IconButton
                          onClick={() => handleViewDetails(product.id)}
                          sx={{
                            color: '#d32f2f',
                            '&:hover': {
                              backgroundColor: 'rgba(211, 47, 47, 0.1)',
                            }
                          }}
                        >
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleEdit(product.id)}
                          sx={{
                            color: '#d32f2f',
                            '&:hover': {
                              backgroundColor: 'rgba(211, 47, 47, 0.1)',
                            }
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete(product.id)}
                          sx={{
                            color: '#d32f2f',
                            '&:hover': {
                              backgroundColor: 'rgba(211, 47, 47, 0.1)',
                            }
                          }}
                          disabled={deleteMutation.isPending}
                        >
                          {deleteMutation.isPending ? (
                            <CircularProgress size={24} color="inherit" />
                          ) : (
                            <DeleteIcon />
                          )}
                        </IconButton>
                      </Box>
                    </Paper>
                  ))}
                </Box>
              )}
            </>
          )}
          {sortedProducts.length > 0 && (
            <Box textAlign="center" sx={{ mt: 4 }}>
              <Button
                variant="contained"
                sx={{
                  background: "#d32f2f",
                  color: "#fff",
                  fontWeight: "bold",
                  "&:hover": {
                    background: "#b71c1c",
                    animation: "${buttonHover} 0.3s ease forwards"
                  },
                  py: 1.5,
                  fontSize: "1rem",
                  transition: 'all 0.3s ease'
                }}
                onClick={() => router.push("/cms/create")}
              >
                Add Product
              </Button>
            </Box>
          )}
        </Paper>
      </Grid>
    </>
  );
};

export default ProductListPage;