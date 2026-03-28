package com.app.intellicart.service;

import com.app.intellicart.dto.*;
import com.app.intellicart.entity.Category;
import com.app.intellicart.entity.ProductListing;
import com.app.intellicart.repository.CategoryRepository;
import com.app.intellicart.repository.ProductListingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final ProductListingRepository productListingRepository;

    public CategoryPageDto getCategoryPage(Long categoryId) {
        Category rootCategory = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        List<Long> subtreeCategoryIds = new ArrayList<>();
        collectDescendantIds(rootCategory, subtreeCategoryIds);

        List<ProductListing> listings =
                productListingRepository.findAllByProductCategoryIds(subtreeCategoryIds);

        List<ProductCardDto> products = listings.stream()
                .map(this::mapToCard)
                .toList();

        return CategoryPageDto.builder()
                .category(
                        CategoryDto.builder()
                                .id(rootCategory.getId())
                                .name(rootCategory.getName())
                                .image(rootCategory.getImage())
                                .build()
                )
                .products(products)
                .build();
    }

    private void collectDescendantIds(Category category, List<Long> ids) {
        ids.add(category.getId());

        if (category.getChildren() != null) {
            for (Category child : category.getChildren()) {
                collectDescendantIds(child, ids);
            }
        }
    }

    private ProductCardDto mapToCard(ProductListing listing) {
        Integer discount = 0;
        Double rating = 4.5;

        if (listing.getAttributes() != null) {
            Object discountObj = listing.getAttributes().get("discount");
            Object ratingObj = listing.getAttributes().get("rating");

            if (discountObj != null) {
                discount = Integer.parseInt(discountObj.toString());
            }

            if (ratingObj != null) {
                rating = Double.parseDouble(ratingObj.toString());
            }
        }

        return ProductCardDto.builder()
                .id(listing.getId())
                .name(listing.getProduct().getName())
                .price(listing.getPrice())
                .currency(listing.getCurrency())
                .image(listing.getProduct().getImage())
                .discount(discount)
                .rating(rating)
                .build();
    }
}