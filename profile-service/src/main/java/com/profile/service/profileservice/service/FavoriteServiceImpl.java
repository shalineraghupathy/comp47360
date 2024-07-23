package com.profile.service.profileservice.service;

import com.profile.service.profileservice.entity.FavoriteEntity;
import com.profile.service.profileservice.entity.UserEntity;
import com.profile.service.profileservice.repository.FavoriteRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class FavoriteServiceImpl implements FavoriteService {

    @Autowired
    private final FavoriteRepository favoriteRepository;

    @Override
    public int addFavorite(String parkId) {
        Long userId = getUserIdFromAuthentication();
        if (favoriteRepository.existsByUserIdAndParkId(userId, parkId)) {
            return 0;
        }
        FavoriteEntity favoriteEntity = new FavoriteEntity();
        favoriteEntity.setParkId(parkId);
        favoriteEntity.setUserId(userId);
        favoriteRepository.save(favoriteEntity);
        return 1;
    }

    @Override
    public int deleteFavorite(String parkId) {
        Long userId = getUserIdFromAuthentication();
        return favoriteRepository.deleteByUserIdAndParkId(userId, parkId);
    }

    @Override
    public List<String> queryFavorite() {
        Long userId = getUserIdFromAuthentication();
        List<FavoriteEntity> favoriteEntities = favoriteRepository.findByUserId(userId);
        return favoriteEntities.stream().map(FavoriteEntity::getParkId).toList();
    }

    private Long getUserIdFromAuthentication() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            Object principal = authentication.getPrincipal();
            if (principal instanceof UserEntity) {
                UserEntity userEntity = (UserEntity) principal;
                return userEntity.getUserId();
            }
        }
        return null;
    }
}
