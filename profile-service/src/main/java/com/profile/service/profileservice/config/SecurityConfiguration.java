package com.profile.service.profileservice.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {
	
	
	@Autowired
	private JwtAuthenticationFilter authenticationJwtTokenFilter;
	
	@Autowired
	private AuthenticationProvider authenticationProvider;
	
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

		http
	    .csrf().disable()
	    .authorizeHttpRequests()
	        .requestMatchers("/api/v1/auth/**").permitAll()
	        .requestMatchers("/api/v1/auth/profile/**").permitAll()
	        .requestMatchers("/swagger-ui/**").permitAll()
	        .requestMatchers("/api-docs/**").permitAll()
	        .anyRequest().authenticated()
	        .and()
	    .sessionManagement()
	        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
	        .and()
	    .authenticationProvider(authenticationProvider)
	    .addFilterBefore(authenticationJwtTokenFilter, UsernamePasswordAuthenticationFilter.class);
		
		return http.build();
	}

}
