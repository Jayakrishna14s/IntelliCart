package com.app.intellicart.repository;

import com.app.intellicart.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findBySku(String sku);

    @Query(value = """ 
        WITH     RECURSIVE category_tree AS ( SELECT id FROM category WHERE id = :rootId UNION ALL SELECT c.id FROM category c INNER JOIN category_tree ct ON c.parent_id = ct.id ) SELECT * FROM product WHERE category_id IN (SELECT id FROM category_tree) 
    """, nativeQuery = true)
    List<Product> findAllByCategoryTree(@Param("rootId") Long rootId);
}
