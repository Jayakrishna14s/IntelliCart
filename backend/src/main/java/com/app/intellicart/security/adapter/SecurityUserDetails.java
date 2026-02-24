package com.app.intellicart.security.adapter;

import com.app.intellicart.entity.User;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Getter
@Setter
public class SecurityUserDetails implements UserDetails {
    private final Long id;
    private final String password;
    private final List<GrantedAuthority> authorities;
    private final User user;

    public SecurityUserDetails(User user) {
        this.id = user.getId();
        this.password = user.getPassword();
        this.authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(user.getRole().name()));
        this.user = user;
    }

    @Override
    @NonNull
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    @NonNull
    public String getUsername() {
        return String.valueOf(this.id);
    }

}
