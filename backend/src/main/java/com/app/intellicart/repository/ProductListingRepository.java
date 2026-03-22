package com.app.intellicart.repository;

import com.app.intellicart.entity.ProductListing;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductListingRepository extends JpaRepository<ProductListing, Long> {

}
