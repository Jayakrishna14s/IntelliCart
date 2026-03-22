package com.app.intellicart.entity;


import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"latitude", "longitude"})
        }
)
public class Store {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private User owner;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String location;

    @Column(precision = 10, scale = 8, nullable = false)
    private BigDecimal latitude;

    @Column(precision = 10, scale = 8, nullable = false)
    private BigDecimal longitude;

    @Override
    public String toString() {
        return "Store [id=" + id + ", owner=" + owner + ", name=" + name + ", description=" + description
                + ", location=" + location + ", latitude=" + latitude + ", longitude=" + longitude;
    }

}
