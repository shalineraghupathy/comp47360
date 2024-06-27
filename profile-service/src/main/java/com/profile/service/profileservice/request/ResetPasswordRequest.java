package com.profile.service.profileservice.request;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ResetPasswordRequest {
    @NotBlank(message = "Token should not be blank")
    private String token;

    @NotBlank(message = "New password should not be blank")
    private String newPassword;

}


