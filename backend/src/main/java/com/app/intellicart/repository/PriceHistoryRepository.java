package com.app.intellicart.repository;

import com.app.intellicart.entity.PriceHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PriceHistoryRepository extends JpaRepository<PriceHistory, Long> {

    List<PriceHistory> findTop7ByProductListingIdOrderByCreatedAtDesc(Long productListingId);
}
