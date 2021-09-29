package com.example.userservice.service;

import com.example.userservice.dto.UserDto;
import com.example.userservice.entity.UserEntity;
import com.example.userservice.vo.RequestLogin;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface UserService extends UserDetailsService {

    UserDto createUser(UserDto userDto);

    UserDto getUserByUserId(Long userId);

    UserDto getUserDetailsByEmail(String email);

    //전체 사용자 목록 반환
    Iterable<UserEntity> getUserByAll();

    //no security
    public UserDto checkUserByEmail(RequestLogin requestLogin);
}
