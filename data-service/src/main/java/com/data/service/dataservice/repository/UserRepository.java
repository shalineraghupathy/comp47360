package com.data.service.dataservice.repository;


import com.data.service.dataservice.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
@Transactional(readOnly = true)
public interface UserRepository extends JpaRepository<UserEntity, Long> {
	
	Optional<UserEntity> findByUserEmail(String userEmail);
	
	Boolean existsByUserEmail(String email);
	
	@Transactional
    @Modifying
    @Query("UPDATE UserEntity u " +
            "SET u.userStatus = TRUE WHERE u.userEmail = ?1")
    int enableUserEntity(String email);
}
