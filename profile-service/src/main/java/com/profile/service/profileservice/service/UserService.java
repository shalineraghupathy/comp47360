package com.profile.service.profileservice.service;


import com.profile.service.profileservice.request.UserRegisterRequest;
import com.profile.service.profileservice.request.UserSignInRequest;
import com.profile.service.profileservice.response.UserRegisterResponse;
import com.profile.service.profileservice.response.UserSignInResponse;

public interface UserService {
	
	UserRegisterResponse registerUser(UserRegisterRequest userRegisterRequest);

	UserSignInResponse userSignIn(UserSignInRequest userSignInRequest);

	String confirmToken(String token);

	void validateToken(String token);
	
}
