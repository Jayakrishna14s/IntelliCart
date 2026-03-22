package com.app.intellicart.controller;


import com.app.intellicart.entity.Category;
import com.app.intellicart.entity.Product;
import com.app.intellicart.repository.CategoryRepository;
import com.app.intellicart.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/test")
public class TestController {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    @GetMapping("/productsByCategoryRoot")
    public List<Product> getProductsByCategoryTree(@RequestParam Long id) {
        List<Product> products = productRepository.findAllByCategoryTree(id);
        for(Product product : products) {
            System.out.println(product.getCategory());
        }
        return products;
    }

    @GetMapping("/getCategoryHierarchy")
    public Category getCategoryHierarchy(@RequestParam Long id) {

        Category category =  categoryRepository.findById(id).get();
        System.out.println(category.getChildren());
        System.out.println(category.getParent());
        return category;
    }
}
