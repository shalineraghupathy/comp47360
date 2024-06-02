package com.profile.service.profileservice.repository;

import com.profile.service.profileservice.entity.EmailConfirmationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
@Transactional(readOnly = true)
public interface EmailConfirmationRepository extends JpaRepository<EmailConfirmationEntity, Long> {

    Optional<EmailConfirmationEntity> findByEmailConfirmationToken(String token);

    @Transactional
    @Modifying
    @Query("UPDATE EmailConfirmationEntity e " +
            "SET e.emailConfirmationConfirmedAt = ?2 " +
            "WHERE e.emailConfirmationToken = ?1")
    int updateEmailConfirmationConfirmedAt(String token,
                          LocalDateTime confirmedAt);
}