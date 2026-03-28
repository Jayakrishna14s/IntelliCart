//package com.app.intellicart.data;
//
//
//import com.app.intellicart.entity.Category;
//import com.app.intellicart.entity.Product;
//import com.app.intellicart.mapper.ProductMapper;
//import com.app.intellicart.repository.CategoryRepository;
//import com.app.intellicart.repository.ProductRepository;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.core.annotation.Order;
//import org.springframework.stereotype.Component;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//@Slf4j
//@Component
//@RequiredArgsConstructor
//@Order(4)
//public class ProductInitializer implements CommandLineRunner {
//    private final ProductRepository productRepository;
//    private final ProductMapper productMapper;
//    private final CategoryRepository categoryRepository;
//
//    @Override
//    @Transactional
//    public void run(String... args) {
//
//        if (productRepository.count() > 0) {
//            log.info("Products already initialized. Skipping.");
//            return;
//        }
//
//        Category electronics = categoryRepository.findByName("Electronics")
//                .orElseThrow(() -> new IllegalStateException("Category Electronics not found"));
//
//        Category mobiles = categoryRepository.findByName("Mobiles")
//                .orElseThrow(() -> new IllegalStateException("Category Mobiles not found"));
//
//        Category laptops = categoryRepository.findByName("Laptops")
//                .orElseThrow(() -> new IllegalStateException("Category Laptops not found"));
//
//        Category clothing = categoryRepository.findByName("Clothing")
//                .orElseThrow(() -> new IllegalStateException("Category Clothing not found"));
//
//        Category mensFashion = categoryRepository.findByName("Men's Fashions")
//                .orElseThrow(() -> new IllegalStateException("Category Men's Fashions not found"));
//
//        Category womensFashion = categoryRepository.findByName("Women's Fashions")
//                .orElseThrow(() -> new IllegalStateException("Category Women's Fashions not found"));
//
//        Product p1 = productMapper.toEntity(
//                "Wireless Mouse",
//                "Ergonomic wireless mouse with USB receiver",
//                "Logitech",
//                "LOG-MOUSE-01",
//                electronics,
//                new HashMap<>(Map.of(
//                        "connectivity", "Wireless",
//                        "dpi", "1600",
//                        "battery", "AA"
//                ))
//        );
//
//        Product p2 = productMapper.toEntity(
//                "Bluetooth Speaker",
//                "Portable bluetooth speaker with deep bass",
//                "JBL",
//                "JBL-SPK-01",
//                electronics,
//                new HashMap<>(Map.of(
//                        "battery", "10 hours",
//                        "bluetooth", "5.0",
//                        "waterproof", true
//                ))
//        );
//
//        Product p3 = productMapper.toEntity(
//                "Galaxy S23",
//                "Flagship smartphone with powerful camera",
//                "Samsung",
//                "SMSNG-S23",
//                mobiles,
//                new HashMap<>(Map.of(
//                        "ram", "8GB",
//                        "storage", "256GB",
//                        "camera", "50MP"
//                ))
//        );
//
//        Product p4 = productMapper.toEntity(
//                "iPhone 15",
//                "Apple smartphone with A16 chip",
//                "Apple",
//                "APL-IP15",
//                mobiles,
//                new HashMap<>(Map.of(
//                        "ram", "6GB",
//                        "storage", "256GB",
//                        "camera", "48MP"
//                ))
//        );
//
//        Product p5 = productMapper.toEntity(
//                "Inspiron 15 Gaming Laptop",
//                "High performance gaming laptop",
//                "Dell",
//                "DELL-INSP-15",
//                laptops,
//                new HashMap<>(Map.of(
//                        "ram", "16GB",
//                        "storage", "1TB SSD",
//                        "cpu", "Intel i7"
//                ))
//        );
//
//        Product p6 = productMapper.toEntity(
//                "MacBook Air M2",
//                "Ultra thin Apple laptop",
//                "Apple",
//                "APL-MBA-M2",
//                laptops,
//                new HashMap<>(Map.of(
//                        "ram", "8GB",
//                        "storage", "512GB SSD",
//                        "cpu", "Apple M2"
//                ))
//        );
//
//        Product p7 = productMapper.toEntity(
//                "Casual Hoodie",
//                "Comfortable winter hoodie",
//                "Adidas",
//                "ADI-HOOD-01",
//                clothing,
//                new HashMap<>(Map.of(
//                        "material", "Fleece",
//                        "color", "Grey",
//                        "season", "Winter"
//                ))
//        );
//
//        Product p8 = productMapper.toEntity(
//                "Denim Jacket",
//                "Stylish blue denim jacket",
//                "Levis",
//                "LEV-JKT-01",
//                clothing,
//                new HashMap<>(Map.of(
//                        "material", "Denim",
//                        "color", "Blue",
//                        "fit", "Regular"
//                ))
//        );
//
//        Product p9 = productMapper.toEntity(
//                "Men's Casual Shirt",
//                "Slim fit casual shirt",
//                "Allen Solly",
//                "AS-SHRT-01",
//                mensFashion,
//                new HashMap<>(Map.of(
//                        "size", "L",
//                        "color", "White",
//                        "material", "Cotton"
//                ))
//        );
//
//        Product p10 = productMapper.toEntity(
//                "Men's Jeans",
//                "Comfortable blue denim jeans",
//                "Wrangler",
//                "WR-JNS-01",
//                mensFashion,
//                new HashMap<>(Map.of(
//                        "size", "32",
//                        "color", "Blue",
//                        "fit", "Slim"
//                ))
//        );
//
//        Product p11 = productMapper.toEntity(
//                "Women's Summer Dress",
//                "Lightweight floral dress",
//                "Zara",
//                "ZR-DRS-01",
//                womensFashion,
//                new HashMap<>(Map.of(
//                        "size", "M",
//                        "material", "Polyester",
//                        "color", "Floral"
//                ))
//        );
//
//        Product p12 = productMapper.toEntity(
//                "Women's Handbag",
//                "Elegant leather handbag",
//                "Michael Kors",
//                "MK-BAG-01",
//                womensFashion,
//                new HashMap<>(Map.of(
//                        "material", "Leather",
//                        "color", "Brown",
//                        "type", "Handbag"
//                ))
//        );
//
//        productRepository.saveAll(List.of(
//                p1,p2,p3,p4,p5,p6,p7,p8,p9,p10,p11,p12
//        ));
//
//        log.info("Product initialization completed.");
//    }
//}
