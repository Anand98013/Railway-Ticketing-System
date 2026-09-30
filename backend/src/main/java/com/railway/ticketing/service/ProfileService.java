package com.railway.ticketing.service;

import com.railway.ticketing.dto.ProfileRequest;
import com.railway.ticketing.model.*;
import com.railway.ticketing.repository.*;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {
    private final UserRepository users;
    private final UserProfileRepository profiles;

    public ProfileService(UserRepository users, UserProfileRepository profiles) {
        this.users = users;
        this.profiles = profiles;
    }

    public UserProfile get(String email) {
        User user = users.findByEmail(email).orElseThrow();
        return profiles.findByUserId(user.getId()).orElseThrow();
    }

    public UserProfile update(String email, ProfileRequest request) {
        UserProfile profile = get(email);
        if (request.fullName() != null) profile.setFullName(request.fullName());
        if (request.phone() != null) profile.setPhone(request.phone());
        if (request.address() != null) profile.setAddress(request.address());
        if (request.city() != null) profile.setCity(request.city());
        if (request.state() != null) profile.setState(request.state());
        return profiles.save(profile);
    }
}
