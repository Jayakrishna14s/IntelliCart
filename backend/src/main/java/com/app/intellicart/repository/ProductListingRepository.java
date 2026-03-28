package com.app.intellicart.repository;

import com.app.intellicart.entity.ProductListing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductListingRepository extends JpaRepository<ProductListing, Long> {

    @Query(value = """
        SELECT pl.*
        FROM product_listing pl
        JOIN product p ON pl.product_id = p.id
        JOIN category c ON p.category_id = c.id
        WHERE c.id = :rootId
           OR c.parent_id = :rootId
        ORDER BY RANDOM()
        LIMIT 15
        """, nativeQuery = true)
    List<ProductListing> findRandomDealsByRootCategory(Long rootId);

    @Query("""
    SELECT pl
    FROM ProductListing pl
    WHERE pl.product.category.id IN :categoryIds
""")
    List<ProductListing> findAllByProductCategoryIds(List<Long> categoryIds);
}
