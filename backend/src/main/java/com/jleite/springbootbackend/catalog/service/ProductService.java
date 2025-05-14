package com.jleite.springbootbackend.catalog.service;

import com.jleite.springbootbackend.catalog.dto.ProductDTO;
import com.jleite.springbootbackend.catalog.model.Product;

import java.util.List;
import java.util.Optional;

public interface ProductService {

    List<ProductDTO> getAllProducts();

    Optional<ProductDTO> getProductById(Long id);

    ProductDTO saveProduct(Product product);

    void deleteProduct(Long id);

    List<ProductDTO> searchProductsByName(String name);
}
