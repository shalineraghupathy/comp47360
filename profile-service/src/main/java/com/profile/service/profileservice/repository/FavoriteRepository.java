package com.profile.service.profileservice.repository;

import com.profile.service.profileservice.entity.FavoriteEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional(readOnly = true)
public interface FavoriteRepository extends JpaRepository<FavoriteEntity, Long> {

    List<FavoriteEntity> findByUserId(Long userId);

    boolean existsByUserIdAndParkId(Long userId, String parkId);

    @Transactional
    int deleteByUserIdAndParkId(Long userId, String parkId);
}
