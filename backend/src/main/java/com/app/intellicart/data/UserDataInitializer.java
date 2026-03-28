//package com.app.intellicart.data;
//
//
//import com.app.intellicart.entity.User;
//import com.app.intellicart.enums.AccountType;
//import com.app.intellicart.mapper.UserMapper;
//import com.app.intellicart.repository.UserRepository;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.core.annotation.Order;
//import org.springframework.stereotype.Component;
//import org.springframework.transaction.annotation.Transactional;
//
//@Slf4j
//@Component
//@RequiredArgsConstructor
//@Order(1)
//public class UserDataInitializer implements CommandLineRunner {
//    private final UserRepository userRepository;
//    private final UserMapper userMapper;
//
//    @Override
//    @Transactional
//    public void run(String... args) throws Exception {
//        if(userRepository.count() > 0) {
//            return;
//        }
//
//        User user1 = userMapper.toEntity("customer@gmail.com", "Customer@2005", "Customer", "Customer", AccountType.CUSTOMER);
//        User user2 = userMapper.toEntity("jayakrishna@gmail.com", "Krishna@2005", "Jayakrishna", "Paripelli", AccountType.CUSTOMER);
//        User user3 = userMapper.toEntity("seller1@gmail.com", "Seller1@2005", "Seller1", "Seller1", AccountType.SELLER);
//        User user4 = userMapper.toEntity("seller2@gmail.com", "Seller2@2005", "Seller2", "Seller2", AccountType.SELLER);
//        User user5 = userMapper.toEntity("admin@gmail.com", "Admin@2005", "Admin", "Admin", AccountType.ADMIN);
//
//        userRepository.save(user1);
//        userRepository.save(user2);
//        userRepository.save(user3);
//        userRepository.save(user4);
//        userRepository.save(user5);
//
//        log.info("User data initialized successfully");
//    }
//}
