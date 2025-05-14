package com.jleite.backend.catalog.config;

import com.jleite.backend.catalog.model.Product;
import com.jleite.backend.catalog.model.enun.ProductCategory;
import com.jleite.backend.catalog.model.User;
import com.jleite.backend.catalog.repository.ProductRepository;
import com.jleite.backend.catalog.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Configuration
public class DataInitializer {
    private static final String DEFAULT_PASSWORD = "password123";
    private static final String ADMIN_EMAIL = "admin@example.com";
    private static final String USER_EMAIL = "user@example.com";

    private final PasswordEncoder passwordEncoder;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public DataInitializer(PasswordEncoder passwordEncoder,
                           ProductRepository productRepository,
                           UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @Bean
    public CommandLineRunner initData() {
        return args -> {
            initializeUsers();
            initializeProducts();
        };
    }

    private void initializeUsers() {
        if (userRepository.count() == 0) {
            User admin = createUser("admin", ADMIN_EMAIL);
            User user = createUser("user", USER_EMAIL);
            userRepository.saveAll(Arrays.asList(admin, user));
        }
    }

    private User createUser(String username, String email) {
        return new User(
                username,
                email,
                passwordEncoder.encode(DEFAULT_PASSWORD)
        );
    }

    private void initializeProducts() {
        if (productRepository.count() == 0) {
            List<Product> allProducts = new ArrayList<>();
            allProducts.addAll(createElectronicsProducts());
            allProducts.addAll(createClothingProducts());
            allProducts.addAll(createBookProducts());
            allProducts.addAll(createHomeProducts());

            productRepository.saveAll(allProducts);
        }
    }

    private List<Product> createElectronicsProducts() {
        return Arrays.asList(
                new Product(
                        "Smartphone X",
                        "Latest smartphone with advanced features and high-resolution camera.",
                        new BigDecimal("699.99"),
                        ProductCategory.ELECTRONICS,
                        """
                                https://images.unsplash.com/photo-1510166496147-c42f159653ee?q=80&w=2132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D""",
                        50
                ),
                new Product(
                        "Laptop Pro",
                        "Powerful laptop for professionals with high performance.",
                        new BigDecimal("1299.99"),
                        ProductCategory.ELECTRONICS,
                        """
                                https://plus.unsplash.com/premium_photo-1681160405580-a68e9c4707f9?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D""",
                        25
                ),
                new Product(
                        "Wireless Headphones",
                        "Noise-cancelling wireless headphones with premium sound quality.",
                        new BigDecimal("199.99"),
                        ProductCategory.ELECTRONICS,
                        """
                                https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D""",
                        100
                )
        );
    }

    private List<Product> createClothingProducts() {
        return Arrays.asList(
                new Product(
                        "Cotton T-Shirt",
                        "Comfortable cotton t-shirt available in various colors.",
                        new BigDecimal("19.99"),
                        ProductCategory.CLOTHING,
                        """
                                https://images.unsplash.com/photo-1651761179569-4ba2aa054997?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D""",
                        200
                ),
                new Product(
                        "Denim Jeans",
                        "Classic denim jeans with modern fit.",
                        new BigDecimal("49.99"),
                        ProductCategory.CLOTHING,
                        """
                                https://plus.unsplash.com/premium_photo-1674828601362-afb73c907ebe?q=80&w=1953&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D""",
                        150
                )
        );
    }

    private List<Product> createBookProducts() {
        return Arrays.asList(
                new Product(
                        "Novel: The Adventure",
                        "Bestselling novel about an epic adventure.",
                        new BigDecimal("14.99"),
                        ProductCategory.BOOKS,
                        """
                                https://images.unsplash.com/photo-1610882648335-ced8fc8fa6b6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D""",
                        75
                ),
                new Product(
                        "Cookbook: International Cuisine",
                        "Collection of recipes from around the world.",
                        new BigDecimal("24.99"),
                        ProductCategory.BOOKS,
                        """
                                https://images.unsplash.com/photo-1665110180279-ee5372bb96bb?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D""",
                        40
                )
        );
    }

    private List<Product> createHomeProducts() {
        return Arrays.asList(
                new Product(
                        "Coffee Table",
                        "Modern coffee table with wooden finish.",
                        new BigDecimal("149.99"),
                        ProductCategory.HOME,
                        """
                                https://images.unsplash.com/photo-1629908787565-db80d8234b43?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D""",
                        15
                ),
                new Product(
                        "Bedside Lamp",
                        "Elegant bedside lamp with adjustable brightness.",
                        new BigDecimal("39.99"),
                        ProductCategory.HOME,
                        """
                                https://images.unsplash.com/photo-1570974802254-4b0ad1a755f5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D""",
                        60
                ),
                new Product(
                        "Kitchen Blender",
                        "High-powered blender for smoothies and food preparation.",
                        new BigDecimal("89.99"),
                        ProductCategory.HOME,
                        """
                                https://plus.unsplash.com/premium_photo-1683140593992-4a963b0b9f4b?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D""",
                        30
                )
        );
    }
}
