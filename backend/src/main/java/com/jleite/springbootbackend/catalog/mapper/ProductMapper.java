package com.jleite.springbootbackend.catalog.mapper;

import com.jleite.springbootbackend.catalog.dto.ProductDTO;
import com.jleite.springbootbackend.catalog.model.Product;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {

    public ProductDTO toDTO(Product product) {
        if (product == null) return null;

        return new ProductDTO(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getCategory(),
                product.getImageUrl(),
                product.getStockQuantity()
        );
    }

    public Product toEntity(ProductDTO dto) {
        if (dto == null) return null;

        Product product = new Product();
        product.setId(dto.id());
        return fillEntityFromDTO(product, dto);
    }

    private Product fillEntityFromDTO(Product product, ProductDTO dto) {
        product.setName(dto.name());
        product.setDescription(dto.description());
        product.setPrice(dto.price());
        product.setCategory(dto.category());
        product.setImageUrl(dto.imageUrl());
        product.setStockQuantity(dto.stockQuantity());
        return product;
    }
}
