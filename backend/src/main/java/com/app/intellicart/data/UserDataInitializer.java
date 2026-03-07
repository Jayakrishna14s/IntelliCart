package com.app.intellicart.data;


import com.app.intellicart.entity.User;
import com.app.intellicart.enums.AccountType;
import com.app.intellicart.mapper.UserMapper;
import com.app.intellicart.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Component
@RequiredArgsConstructor
public class UserDataInitializer implements CommandLineRunner {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if(userRepository.count() > 0) {
            return;
        }

        User user1 = userMapper.toEntity("customer@gmail.com", "Customer@2005", "Customer", "Customer", AccountType.CUSTOMER);
        User user2 = userMapper.toEntity("jayakrishna@gmail.com", "Krishna@2005", "Jayakrishna", "Paripelli", AccountType.CUSTOMER);
        User user3 = userMapper.toEntity("seller@gmail.com", "Seller@2005", "Seller", "Seller", AccountType.SELLER);
        User user4 = userMapper.toEntity("admin@gmail.com", "Admin@2005", "Admin", "Admin", AccountType.ADMIN);

        userRepository.save(user1);
        userRepository.save(user2);
        userRepository.save(user3);
        userRepository.save(user4);

        log.info("User data initialized successfully");
    }
}
