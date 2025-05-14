package com.jleite.springbootbackend.catalog.dto;

import com.jleite.springbootbackend.catalog.model.enun.ProductCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;

public record ProductDTO (
        Long id,
        @NotBlank(message = "Product name is required")
        String name,
        String description,
        @NotNull(message = "Price is required")
        @Positive(message = "Price must be positive")
        BigDecimal price,
        ProductCategory category,
        String imageUrl,
        Integer stockQuantity
) {
}