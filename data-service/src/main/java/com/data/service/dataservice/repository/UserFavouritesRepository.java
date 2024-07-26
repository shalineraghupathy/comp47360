package com.data.service.dataservice.repository;

import com.data.service.dataservice.entity.UserFavourites;
import com.data.service.dataservice.entity.UserFavouritesKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
@Repository
@Transactional
public interface UserFavouritesRepository extends JpaRepository<UserFavourites, UserFavouritesKey> {

    boolean existsById(UserFavouritesKey id);
    @Query("SELECT f FROM UserFavourites f WHERE f.id.userID = ?1")
    List<UserFavourites> findByUserId(Long userId);

}

