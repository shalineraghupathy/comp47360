package com.profile.service.profileservice.controller;

import com.profile.service.profileservice.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/favorite")
@CrossOrigin(origins = "http://localhost:3000") // Add this line
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    @GetMapping("/addFavorite")
    public ResponseEntity<?> addFavorite(@RequestParam String parkId) {
        return ResponseEntity.ok(favoriteService.addFavorite(parkId));
    }

    @GetMapping("/deleteFavorite")
    public ResponseEntity<?> deleteFavorite(@RequestParam String parkId) {
        return ResponseEntity.ok(favoriteService.deleteFavorite(parkId));
    }

    @GetMapping("/queryFavorite")
    public ResponseEntity<?> queryFavorite() {
        return ResponseEntity.ok(favoriteService.queryFavorite());
    }
}
