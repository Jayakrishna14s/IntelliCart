package com.app.intellicart.mapper;


import com.app.intellicart.entity.ProductListing;
import com.app.intellicart.entity.Review;
import com.app.intellicart.entity.User;
import org.springframework.stereotype.Component;

@Component
public class ReviewMapper {

    public Review toEntity(User user, ProductListing productListing, Integer rating, String comment) {
        return Review.builder()
                .user(user)
                .productListing(productListing)
                .rating(rating)
                .comment(comment)
                .build();
    }
}
