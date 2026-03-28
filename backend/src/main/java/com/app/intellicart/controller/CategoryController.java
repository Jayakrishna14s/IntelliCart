package com.app.intellicart.controller;

import com.app.intellicart.dto.CategoryPageDto;
import com.app.intellicart.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/category")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping("/{id}")
    public CategoryPageDto getCategoryPage(@PathVariable Long id) {
        return categoryService.getCategoryPage(id);
    }
}