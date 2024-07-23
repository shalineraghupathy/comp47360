package com.data.service.dataservice.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="user_profile",
		uniqueConstraints = {
        @UniqueConstraint(columnNames = "user_email")
    })
public class UserEntity implements UserDetails{
	 
    private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_id")
    private Long userId;
    
    @Column(name = "user_first_name", nullable=false)
    private String userFirstName;
    
    @Column(name = "user_last_name", nullable=false)
    private String userLastName;
    
    @Column(name = "user_email", nullable=false)
    @Email
    private String userEmail;
    
    @Column(name = "user_password", nullable=false)
    private String userPassword;
    
    @Column(name = "user_status", nullable=false)
    private boolean userStatus = Boolean.FALSE;

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getUserFirstName() {
		return userFirstName;
	}

	public void setUserFirstName(String userFirstName) {
		this.userFirstName = userFirstName;
	}

	public String getUserLastName() {
		return userLastName;
	}

	public void setUserLastName(String userLastName) {
		this.userLastName = userLastName;
	}

	public String getUserEmail() {
		return userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	public String getUserPassword() {
		return userPassword;
	}

	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}

	public boolean getUserStatus() {
		return userStatus;
	}

	public void setUserStatus(boolean userStatus) {
		this.userStatus = userStatus;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return List.of(new SimpleGrantedAuthority("User"));
	}

	@Override
	public String getPassword() {
		return userPassword;
	}

	@Override
	public String getUsername() {
		return userEmail;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return userStatus;
	}
    
}