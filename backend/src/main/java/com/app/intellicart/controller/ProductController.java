package com.app.intellicart.controller;

import com.app.intellicart.dto.ProductListingDetailsDto;
import com.app.intellicart.service.ProductListingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/listing")
@RequiredArgsConstructor
public class ProductController {

    private final ProductListingService productListingService;

    @GetMapping("/{productListingId}")
    public ProductListingDetailsDto getListingDetails(@PathVariable Long productListingId) {
        return productListingService.getListingDetailsWithPrediction(productListingId);
    }
}