package com.dnaeasy.dnaeasy.dto.request;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentRequest {
    @NotBlank(message = "noi dung k dc de trong")
    @Size(max = 500, message = "noi dung chua 500 ky tu")
    private String commentContent;

    @NotNull(message = "rating ko dc de tron")
    @Min(value = 1, message = "rating tu 1 to 5")
    @Max(value = 5,message = "rating tu 1 to 5")
    private Integer rating;

    @NotNull(message = "cummerid ko dc trong")
    private int customerId;

    @NotNull(message = "serviceid ko dc trong")
    private int serviceId;
}
