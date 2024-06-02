package com.profile.service.profileservice.service;

import com.profile.service.profileservice.entity.EmailConfirmationEntity;
import com.profile.service.profileservice.entity.UserEntity;
import com.profile.service.profileservice.repository.EmailConfirmationRepository;
import com.profile.service.profileservice.repository.UserRepository;
import com.profile.service.profileservice.request.UserRegisterRequest;
import com.profile.service.profileservice.response.UserRegisterResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
    private UserRepository userRepository;
	
	@Autowired
    private PasswordEncoder passwordEncoder;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
//	@Autowired
//	private JwtService jwtService;
	
	@Autowired
	private EmailConfirmationRepository emailConfirmationRepository;
	
	@Autowired
	private EmailService emailService;

	@Override
	public UserRegisterResponse registerUser(UserRegisterRequest userRegisterRequest) {

		if (Boolean.TRUE.equals(userRepository.existsByUserEmail(userRegisterRequest.getUserEmail()))) {
		    throw new IllegalArgumentException("Email is already in use!");
		}
        
		UserEntity user = new UserEntity();
		
        user.setUserFirstName(userRegisterRequest.getUserFirstName());
        user.setUserLastName(userRegisterRequest.getUserLastName());
        user.setUserEmail(userRegisterRequest.getUserEmail());
        user.setUserPassword(passwordEncoder.encode(userRegisterRequest.getUserPassword()));
        
        userRepository.save(user);
        
        String token = UUID.randomUUID().toString();

        EmailConfirmationEntity confirmationToken = new EmailConfirmationEntity();
        
        confirmationToken.setEmailConfirmationCreatedAt(LocalDateTime.now());
        confirmationToken.setEmailConfirmationExpiresAt(LocalDateTime.now().plusMinutes(15));
        confirmationToken.setUserId(user);
        confirmationToken.setEmailConfirmationToken(token);
        
        emailConfirmationRepository.save(confirmationToken);
        
        String link = "http://localhost:8080/api/v1/auth/confirm?token=" + token;
        emailService.send(
        		user.getUserEmail(),
                buildEmail(user.getUserFirstName(), link));
        
        return mapToUserRegisterResponse(user);
		
	}

	private UserRegisterResponse mapToUserRegisterResponse(UserEntity user){
		UserRegisterResponse userRegisterResponse = new UserRegisterResponse();
		userRegisterResponse.setUserFirstName(user.getUserFirstName());
		userRegisterResponse.setUserLastName(user.getUserLastName());
		userRegisterResponse.setUserEmail(user.getUserEmail());
		userRegisterResponse.setMessage("User registered successfully!");
        return userRegisterResponse;
    }

//	@Override
//	public UserSignInResponse userSignIn(UserSignInRequest userSignInRequest) {
//		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userSignInRequest.getUserEmail(), userSignInRequest.getUserPassword()));
//		var user = userRepository.findByUserEmail(userSignInRequest.getUserEmail()).orElseThrow();
//		var jwtToken = jwtService.generateToken(user);
//		UserSignInResponse userSignInResponse = new UserSignInResponse();
//		userSignInResponse.setToken(jwtToken);
//		userSignInResponse.setMessage("Login Successfull!!");
//		userSignInResponse.setUserRole(user.getUserRole().toString());
//		userSignInResponse.setUserEmail(user.getUserEmail());
//		userSignInResponse.setUserFirstName(user.getUserFirstName());
//		return userSignInResponse;
//	}
//
	private String buildEmail(String name, String link) {
        return "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;color:#0b0c0c\">\n" +
                "\n" +
                "<span style=\"display:none;font-size:1px;color:#fff;max-height:0\"></span>\n" +
                "\n" +
                "  <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;min-width:100%;width:100%!important\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n" +
                "    <tbody><tr>\n" +
                "      <td width=\"100%\" height=\"53\" bgcolor=\"#0b0c0c\">\n" +
                "        \n" +
                "        <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;max-width:580px\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\">\n" +
                "          <tbody><tr>\n" +
                "            <td width=\"70\" bgcolor=\"#0b0c0c\" valign=\"middle\">\n" +
                "                <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
                "                  <tbody><tr>\n" +
                "                    <td style=\"padding-left:10px\">\n" +
                "                  \n" +
                "                    </td>\n" +
                "                    <td style=\"font-size:28px;line-height:1.315789474;Margin-top:4px;padding-left:10px\">\n" +
                "                      <span style=\"font-family:Helvetica,Arial,sans-serif;font-weight:700;color:#ffffff;text-decoration:none;vertical-align:top;display:inline-block\">Confirm your email</span>\n" +
                "                    </td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "              </a>\n" +
                "            </td>\n" +
                "          </tr>\n" +
                "        </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
                "    <tbody><tr>\n" +
                "      <td width=\"10\" height=\"10\" valign=\"middle\"></td>\n" +
                "      <td>\n" +
                "        \n" +
                "                <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
                "                  <tbody><tr>\n" +
                "                    <td bgcolor=\"#1D70B8\" width=\"100%\" height=\"10\"></td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\" height=\"10\"></td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "\n" +
                "\n" +
                "\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
                "    <tbody><tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "      <td style=\"font-family:Helvetica,Arial,sans-serif;font-size:19px;line-height:1.315789474;max-width:560px\">\n" +
                "        \n" +
                "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Hi " + name + ",</p><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> Thank you for registering. Please click on the below link to activate your account: </p><blockquote style=\"Margin:0 0 20px 0;border-left:10px solid #b1b4b6;padding:15px 0 0.1px 15px;font-size:19px;line-height:25px\"><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> <a href=\"" + link + "\">Activate Now</a> </p></blockquote>\n Link will expire in 15 minutes. <p>See you soon</p>" +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "  </tbody></table><div class=\"yj6qo\"></div><div class=\"adL\">\n" +
                "\n" +
                "</div></div>";
    }
//
//	@Override
//	@Transactional
//    public String confirmToken(String token) {
//		Optional<EmailConfirmationEntity> emailConfirmationEntity = emailConfirmationRepository.findByEmailConfirmationToken(token);
//
//		if(emailConfirmationEntity.isEmpty()) {
//			return "User not found";
//		}
//
//		EmailConfirmationEntity emailConfirmation = emailConfirmationEntity.get();
//
//        if (emailConfirmation.getEmailConfirmationConfirmedAt() != null) {
//            return "Email already confirmed";
//        }
//
//        LocalDateTime expiredAt = emailConfirmation.getEmailConfirmationExpiresAt();
//
//        if (expiredAt.isBefore(LocalDateTime.now())) {
//            return "Activation expired";
//        }
//
//        emailConfirmationRepository.updateEmailConfirmationConfirmedAt(token, LocalDateTime.now());
//
//        userRepository.enableUserEntity(emailConfirmation.getUserId().getUserEmail());
//        return buildAccountConfirmationEmail();
//    }
//
//	@Override
//	public void validateToken(String token) {
//		jwtService.validateToken(token);
//	}
	
//	public String buildAccountConfirmationEmail() {
//		return "<!DOCTYPE html>\n"
//        		+ "<html>\n"
//        		+ "<head>\n"
//        		+ "    <meta charset=\"UTF-8\">\n"
//        		+ "    <title>Email Confirmation</title>\n"
//        		+ "    <style>\n"
//        		+ "        /* Add some basic styling to your email */\n"
//        		+ "        body {\n"
//        		+ "            font-family: Arial, sans-serif;\n"
//        		+ "        }\n"
//        		+ "\n"
//        		+ "        .container {\n"
//        		+ "            width: 100%;\n"
//        		+ "            max-width: 600px;\n"
//        		+ "            margin: 0 auto;\n"
//        		+ "            padding: 20px;\n"
//        		+ "        }\n"
//        		+ "\n"
//        		+ "        .header {\n"
//        		+ "            background-color: #007BFF;\n"
//        		+ "            color: #fff;\n"
//        		+ "            text-align: center;\n"
//        		+ "            padding: 20px;\n"
//        		+ "        }\n"
//        		+ "\n"
//        		+ "        .content {\n"
//        		+ "            padding: 20px;\n"
//        		+ "        }\n"
//        		+ "\n"
//        		+ "        .button {\n"
//        		+ "            display: inline-block;\n"
//        		+ "            background-color: #007BFF;\n"
//        		+ "            color: #fff;\n"
//        		+ "            padding: 10px 20px;\n"
//        		+ "            text-decoration: none;\n"
//        		+ "            border-radius: 5px;\n"
//        		+ "        }\n"
//        		+ "    </style>\n"
//        		+ "</head>\n"
//        		+ "<body>\n"
//        		+ "    <div class=\"container\">\n"
//        		+ "        <div class=\"header\">\n"
//        		+ "            <h1>Email Confirmation Successful</h1>\n"
//        		+ "        </div>\n"
//        		+ "        <div class=\"content\">\n"
//        		+ "            <p>Your email has been successfully confirmed. You can now start using our services.</p>\n"
//        		+ "            <p>If you have any questions or need assistance, please don't hesitate to contact us.</p>\n"
//        		+ "            <p>Thank you for choosing our service!</p>\n"
//        		+ "        </div>\n"
//        		+ "        <div style=\"text-align: center;\">\n"
//        		+ "            <a class=\"button\" href=\"http://localhost:3000/signup\">Go to Website</a>\n"
//        		+ "        </div>\n"
//        		+ "    </div>\n"
//        		+ "</body>\n"
//        		+ "</html>\n"
//        		+ "";
//	}
//
}