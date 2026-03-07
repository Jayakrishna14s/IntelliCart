package com.app.intellicart.mapper;


import com.app.intellicart.entity.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {
    public Category toEntity(String name) {

        if(name == null) return null;
        return Category.builder().name(name).build();
    }
}
