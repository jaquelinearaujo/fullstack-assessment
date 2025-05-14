package com.jleite.springbootbackend.catalog.controller;

import com.jleite.springbootbackend.catalog.dto.ProductDTO;
import com.jleite.springbootbackend.catalog.exception.ResourceNotFoundException;
import com.jleite.springbootbackend.catalog.mapper.ProductMapper;
import com.jleite.springbootbackend.catalog.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    private final ProductService productService;
    private final ProductMapper productMapper;

    @Autowired
    public ProductController(
            ProductService productService,
            ProductMapper productMapper
    ) {
        this.productService = productService;
        this.productMapper = productMapper;
    }

    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        var productDTOs = productService.getAllProducts();
        return new ResponseEntity<>(productDTOs, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        var productDTO = productService.getProductById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));
        return new ResponseEntity<>(productDTO, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ProductDTO> createProduct(@Valid @RequestBody ProductDTO productDTO) {
        var product = productMapper.toEntity(productDTO);
        var savedProductDTO = productService.saveProduct(product);
        return new ResponseEntity<>(savedProductDTO, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody ProductDTO productDetailsDTO
    ) {
        productService.getProductById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));

        var product = productMapper.toEntity(productDetailsDTO);
        product.setId(id);

        var updatedProductDTO = productService.saveProduct(product);
        return new ResponseEntity<>(updatedProductDTO, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.getProductById(id)
                .ifPresentOrElse(product -> productService.deleteProduct(id), () -> {
                    throw new ResourceNotFoundException("Product", "id", id);
                });

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<ProductDTO>> searchProducts(@RequestParam String name) {
        var productDTOs = productService.searchProductsByName(name);
        return new ResponseEntity<>(productDTOs, HttpStatus.OK);
    }
}
