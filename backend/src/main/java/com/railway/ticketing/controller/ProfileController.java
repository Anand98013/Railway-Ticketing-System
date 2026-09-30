package com.railway.ticketing.controller;

import com.railway.ticketing.dto.ProfileRequest;
import com.railway.ticketing.model.UserProfile;
import com.railway.ticketing.service.ProfileService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {
    private final ProfileService service;

    public ProfileController(ProfileService service) {
        this.service = service;
    }

    @GetMapping
    public UserProfile get(Authentication auth) {
        return service.get(auth.getName());
    }

    @PutMapping
    public UserProfile update(Authentication auth, @RequestBody ProfileRequest request) {
        return service.update(auth.getName(), request);
    }
}
