package com.app.intellicart.mapper;


import com.app.intellicart.entity.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {
    public Category toEntity(String name) {
        return Category.builder().name(name).build();
    }
}
