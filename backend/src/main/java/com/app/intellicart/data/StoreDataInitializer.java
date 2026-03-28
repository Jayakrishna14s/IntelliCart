//package com.app.intellicart.data;
//
//
//import com.app.intellicart.entity.Store;
//import com.app.intellicart.entity.User;
//import com.app.intellicart.mapper.StoreMapper;
//import com.app.intellicart.repository.StoreRepository;
//import com.app.intellicart.repository.UserRepository;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.core.annotation.Order;
//import org.springframework.stereotype.Component;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.math.BigDecimal;
//import java.util.Optional;
//
//@Slf4j
//@Component
//@RequiredArgsConstructor
//@Order(3)
//public class StoreDataInitializer implements CommandLineRunner {
//    private final StoreRepository storeRepository;
//    private final UserRepository userRepository;
//    private final StoreMapper storeMapper;
//
//
//
//    @Override
//    @Transactional
//    public void run(String... args) throws Exception {
//        if(storeRepository.count() > 0) {
//            return;
//        }
//
//        Optional<User> owner1 = userRepository.findByEmail("seller1@gmail.com");
//        Optional<User> owner2 = userRepository.findByEmail("seller2@gmail.com");
//
//        Store techWorld = storeMapper.toEntity(
//            owner1.get(),
//            "TechWorld",
//            "Electronics, Gadgets, Accessories",
//            "Banjara Hills, Hyderabad",
//            new BigDecimal("17.4375"),
//            new BigDecimal("78.4483")
//        );
//
//        Store fashionHub = storeMapper.toEntity(
//                owner2.get(),
//                "FashionHub",
//                "Clothing and lifestyle products",
//                "Banjara Hills, Hyderabad",
//                new BigDecimal("17.4126"),
//                new BigDecimal("78.4482")
//        );
//
//        storeRepository.save(techWorld);
//        storeRepository.save(fashionHub);
//
//        log.info("Store data initialized successfully.");
//    }
//}
