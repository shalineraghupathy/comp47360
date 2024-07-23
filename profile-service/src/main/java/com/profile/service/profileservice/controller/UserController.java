package com.profile.service.profileservice.controller;
import com.profile.service.profileservice.request.ResetPasswordRequest;
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
@CrossOrigin(origins = "http://localhost:3000") // Add this line
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

	@PostMapping("/resendVerificationEmail")
	public ResponseEntity<String> resendVerificationEmail(@RequestParam("email") String email) {
		userService.resendVerificationEmail(email);
		return ResponseEntity.ok("Verification email resent successfully");
	}

	@PostMapping("/forgotPassword")
	public ResponseEntity<String> forgotPassword(@RequestParam("email") String email) {
		userService.forgotPassword(email);
		return ResponseEntity.ok("Password reset link sent successfully");
	}

	@PostMapping("/resetPassword")
	public ResponseEntity<String> resetPassword(@Valid @RequestBody ResetPasswordRequest resetPasswordRequest) {
		userService.resetPassword(resetPasswordRequest);
		return ResponseEntity.ok("Password reset successfully");
	}

}
