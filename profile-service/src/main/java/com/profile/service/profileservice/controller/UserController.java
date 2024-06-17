package com.profile.service.profileservice.controller;
import com.profile.service.profileservice.request.UserRegisterRequest;
import com.profile.service.profileservice.request.UserSignInRequest;
import com.profile.service.profileservice.response.UserRegisterResponse;
import com.profile.service.profileservice.response.UserSignInResponse;
import com.profile.service.profileservice.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class UserController {

	@Autowired 
	private UserService userService;

	@PostMapping("/registerUser")
	public ResponseEntity<?> registerUser(@Valid @RequestBody UserRegisterRequest userRegisterRequest) {
		UserRegisterResponse userRegisterResponse = new UserRegisterResponse();
		userRegisterResponse = userService.registerUser(userRegisterRequest);
		return ResponseEntity.ok(userRegisterResponse);

	}
	@GetMapping("/confirm")
	public ResponseEntity<?> confirm(@RequestParam("token") String token) {
		return ResponseEntity.ok(userService.confirmToken(token));
	}

	@PostMapping("/signin")
	public ResponseEntity<?> userSignin(
			@Valid @RequestBody UserSignInRequest userSignInRequest) {
		UserSignInResponse userSignInResponse = new UserSignInResponse();
		userSignInResponse = userService.userSignIn(userSignInRequest);
		return ResponseEntity.ok(userSignInResponse);
	}
	
	@GetMapping("/validateToken")
	public String validateToken(@RequestParam("token") String token) {
		userService.validateToken(token);
		return "Token is valid";
	}

}
