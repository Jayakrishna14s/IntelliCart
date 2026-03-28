package com.app.intellicart.service;

import com.app.intellicart.dto.*;
import com.app.intellicart.entity.Category;
import com.app.intellicart.entity.ProductListing;
import com.app.intellicart.repository.CategoryRepository;
import com.app.intellicart.repository.ProductListingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DealsService {

    private final CategoryRepository categoryRepository;
    private final ProductListingRepository productListingRepository;

    public DealsDto getDeals() {

        List<Category> rootCategories = categoryRepository.findByParentIsNull();

        List<DealsSectionDto> sections = new ArrayList<>();

        for (Category root : rootCategories) {

            List<ProductListing> listings =
                    productListingRepository.findRandomDealsByRootCategory(root.getId());

            List<ProductCardDto> dealCards = listings.stream()
                    .map(this::mapToCard)
                    .toList();

            sections.add(
                    DealsSectionDto.builder()
                            .rootCategory(
                                    CategoryDto.builder()
                                            .id(root.getId())
                                            .name(root.getName())
                                            .image(root.getImage())
                                            .build()
                            )
                            .deals(dealCards)
                            .build()
            );
        }

        return DealsDto.builder()
                .sections(sections)
                .build();
    }

    private ProductCardDto mapToCard(ProductListing listing) {

        String name = listing.getProduct().getName();
        String image = listing.getProduct().getImage();

        Integer discount = 0;
        Double rating = 4.5;

        Map<String, Object> attr = listing.getAttributes();

        if (attr != null) {
            if (attr.get("discount") != null) {
                discount = Integer.parseInt(attr.get("discount").toString());
            }

            if (attr.get("rating") != null) {
                rating = Double.parseDouble(attr.get("rating").toString());
            }
        }

        return ProductCardDto.builder()
                .id(listing.getId())
                .name(name)
                .price(listing.getPrice())
                .currency(listing.getCurrency())
                .image(image)
                .discount(discount)
                .rating(rating)
                .build();
    }
}