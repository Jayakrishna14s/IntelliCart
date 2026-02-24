package com.app.intellicart.security.service;

import com.app.intellicart.entity.User;
import com.app.intellicart.repository.UserRepository;
import com.app.intellicart.security.adapter.SecurityUserDetails;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class SecurityUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    @NonNull
    public UserDetails loadUserByUsername(@NonNull String username) throws UsernameNotFoundException {
        Optional<User> userDetail = userRepository.findByEmail(username);
        return userDetail.map(SecurityUserDetails::new).orElseThrow(() -> new UsernameNotFoundException("User Not Found - " + username));
    }

    public UserDetails loadUserById(@NonNull Long id) throws UsernameNotFoundException {
        Optional<User> userDetail = userRepository.findById(id);
        return userDetail.map(SecurityUserDetails::new).orElseThrow(() -> new UsernameNotFoundException("User Not Found - " + id));
    }
}
