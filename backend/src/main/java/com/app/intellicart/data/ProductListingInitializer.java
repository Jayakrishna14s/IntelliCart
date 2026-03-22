package com.app.intellicart.data;

import com.app.intellicart.entity.Product;
import com.app.intellicart.entity.ProductListing;
import com.app.intellicart.entity.Store;
import com.app.intellicart.mapper.ProductListingMapper;
import com.app.intellicart.repository.ProductListingRepository;
import com.app.intellicart.repository.ProductRepository;
import com.app.intellicart.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
@Order(5)
public class ProductListingInitializer implements CommandLineRunner {

    private final ProductRepository productRepository;
    private final StoreRepository storeRepository;
    private final ProductListingRepository productListingRepository;
    private final ProductListingMapper productListingMapper;

    @Override
    @Transactional
    public void run(String... args) {

        if (productListingRepository.count() > 0) {
            log.info("Product listings already initialized. Skipping.");
            return;
        }

        List<Product> products = productRepository.findAll();
        List<Store> stores = storeRepository.findAll();

        if (products.isEmpty() || stores.isEmpty()) {
            throw new IllegalStateException("Products or Stores not initialized");
        }

        List<ProductListing> listings = products.stream()
                .flatMap(product -> stores.stream().map(store -> {

                    BigDecimal basePrice = generateBasePrice(product.getName());

                    Map<String, Object> attributes = new HashMap<>();
                    attributes.put("delivery_time", (1 + (int)(Math.random() * 5)) + " days");
                    attributes.put("seller_rating", 3.5 + (Math.random() * 1.5));

                    return productListingMapper.toEntity(
                            product,
                            store,
                            basePrice,
                            "INR",
                            attributes
                    );
                }))
                .toList();

        productListingRepository.saveAll(listings);

        log.info("Product listing initialization completed. Total listings: {}", listings.size());
    }

    private BigDecimal generateBasePrice(String productName) {

        switch (productName) {

            case "Wireless Mouse":
                return randomInRange(400, 900);

            case "Bluetooth Speaker":
                return randomInRange(1500, 4000);

            case "Galaxy S23":
                return randomInRange(65000, 75000);

            case "iPhone 15":
                return randomInRange(75000, 90000);

            case "Inspiron 15 Gaming Laptop":
                return randomInRange(55000, 80000);

            case "MacBook Air M2":
                return randomInRange(90000, 120000);

            case "Casual Hoodie":
                return randomInRange(1200, 3000);

            case "Denim Jacket":
                return randomInRange(2000, 5000);

            case "Men's Casual Shirt":
                return randomInRange(800, 2000);

            case "Men's Jeans":
                return randomInRange(1500, 3500);

            case "Women's Summer Dress":
                return randomInRange(1200, 3500);

            case "Women's Handbag":
                return randomInRange(3000, 10000);

            default:
                return randomInRange(1000, 5000);
        }
    }

    private BigDecimal randomInRange(int min, int max) {
        double value = min + (Math.random() * (max - min));
        return BigDecimal.valueOf(Math.round(value));
    }
}