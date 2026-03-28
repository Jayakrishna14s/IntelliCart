package com.app.intellicart.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Inventory {

    @Id
    @Column(name = "listing_id")
    private Long listingId;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "listing_id")
    private ProductListing productListing;

    @Column(nullable = false)
    @Builder.Default
    private Integer quantity = 0;

    @Column(nullable = false)
    @Builder.Default
    private Integer reservedQuantity = 0;

    @Override
    public String toString() {
        return "Inventory{" +
               "listingId=" + listingId +
               ", productListing=" + productListing +
               ", quantity=" + quantity +
               ", reservedQuantity=" + reservedQuantity +
               '}';
    }
}
