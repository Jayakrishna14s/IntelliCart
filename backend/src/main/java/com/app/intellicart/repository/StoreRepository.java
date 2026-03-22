package com.app.intellicart.repository;

import com.app.intellicart.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StoreRepository extends JpaRepository<Store, Long> {
    Optional<Store> findByLatitudeAndLongitude(double latitude, double longitude);
}
