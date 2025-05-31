package com.dnaeasy.dnaeasy.controller;

import com.dnaeasy.dnaeasy.dto.request.UserUpdateResquest;
import com.dnaeasy.dnaeasy.dto.response.UserResponse;
import com.dnaeasy.dnaeasy.service.impl.UserService;
import com.dnaeasy.dnaeasy.util.CloudinaryUtil;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor

@RequestMapping("api/user")

public class UserController {
  UserService userService;
  CloudinaryUtil cloudinaryUtil;
    @PostMapping ("/get")
    public ResponseEntity<List<UserResponse>> GetAllUSer() {

    return ResponseEntity.ok(userService.getALlCustomers());
    }
    @GetMapping("/myinfor")
  public ResponseEntity<UserResponse> getMyInfor() {
      return ResponseEntity.ok(userService.myInfor());
    }
   @PostMapping("/update")
  public ResponseEntity<String> updateUser(@RequestPart("user")UserUpdateResquest userUpdateResquest,@RequestPart("file") MultipartFile file) {
      try{


        userUpdateResquest.setAvatarUrl(cloudinaryUtil.uploadImage(file));
      } catch (Exception e) {
        throw new RuntimeException(e);
      }
      return ResponseEntity.ok(userService.updateUser(userUpdateResquest));

   }
   @GetMapping("/delete/{id}")
    public ResponseEntity<?> Delete(@PathVariable("id") int id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
   }

}
