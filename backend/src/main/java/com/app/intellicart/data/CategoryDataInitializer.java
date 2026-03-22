package com.app.intellicart.data;


import com.app.intellicart.entity.Category;
import com.app.intellicart.mapper.CategoryMapper;
import com.app.intellicart.repository.CategoryRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;


@Slf4j
@Component
@RequiredArgsConstructor
@Order(2)
public class CategoryDataInitializer implements CommandLineRunner {
    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if(categoryRepository.count() > 0) {
            return;
        }

        Category electronics = categoryMapper.toEntity("Electronics");
        Category clothing = categoryMapper.toEntity("Clothing");

        Category mobiles = categoryMapper.toEntity("Mobiles");
        Category laptops = categoryMapper.toEntity("Laptops");

        Category men = categoryMapper.toEntity("Men's Fashions");
        Category women = categoryMapper.toEntity("Women's Fashions");

        electronics.addChild(mobiles);
        electronics.addChild(laptops);

        clothing.addChild(men);
        clothing.addChild(women);

        categoryRepository.save(electronics);
        categoryRepository.save(clothing);

        log.info("Category data initialized successfully. ");
    }
}
