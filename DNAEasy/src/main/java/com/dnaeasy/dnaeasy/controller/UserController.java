package com.dnaeasy.dnaeasy.controller;

import com.dnaeasy.dnaeasy.dto.request.PersonRequest;
import com.dnaeasy.dnaeasy.dto.request.UserFilterRequest;
import com.dnaeasy.dnaeasy.dto.request.UserUpdateRequest;
import com.dnaeasy.dnaeasy.dto.request.UserUpdateResquest;
import com.dnaeasy.dnaeasy.dto.response.UserCountResponse;
import com.dnaeasy.dnaeasy.dto.response.UserFilterRespone;
import com.dnaeasy.dnaeasy.dto.response.UserReportReponse;
import com.dnaeasy.dnaeasy.dto.response.UserResponse;
import com.dnaeasy.dnaeasy.enums.RoleName;
import com.dnaeasy.dnaeasy.service.impl.UserService;
import com.dnaeasy.dnaeasy.util.CloudinaryUtil;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
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
  public ResponseEntity<String> updateUser(@Valid  @RequestPart("user")UserUpdateResquest userUpdateResquest, @RequestPart(value = "file",required = false) MultipartFile file) {
      try{

      if(file != null){
          userUpdateResquest.setAvatarUrl(cloudinaryUtil.uploadImage(file));
      }

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
    @GetMapping("/report")
    public ResponseEntity<List<UserReportReponse>> getUserReport(@RequestBody PersonRequest request){
        List<UserReportReponse> repone = userService.listUser(request);
        return ResponseEntity.ok(repone);
    }

    @PostMapping("/filter")
    public ResponseEntity<Page<UserFilterRespone>> filterUser(@RequestBody UserFilterRequest request,

                                                              @RequestParam("page") int page, @RequestParam("size") int size
        ){

        Pageable pagee = PageRequest.of(page-1, size, Sort.by("createdDate").descending());
        Page<UserFilterRespone> filter = userService.filterUser(request,pagee);
        return ResponseEntity.ok(filter);
    }

    @PutMapping("/update-user")
    public ResponseEntity<String> updateUser(@RequestBody UserUpdateRequest request) {
        try {
            userService.updateUser(request);
            return ResponseEntity.ok("Cập nhật thành công!");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/count")
    public ResponseEntity<Integer> countUsers() {
        return ResponseEntity.ok(userService.getTotalUsers());
    }

    @GetMapping("/count-by-role")
    public ResponseEntity<UserCountResponse> getUserCounts( ){
        return ResponseEntity.ok(userService.getUserCounts());
    }

    @GetMapping("/active/{id}")
    public ResponseEntity<Void> isActive(@PathVariable("id") int id) {
        userService.ActiveUser(id);
        return ResponseEntity.ok().build();
    }
    @PostMapping("/byphone")
    public ResponseEntity<UserResponse> getByphone(@RequestBody String phone) {
      return ResponseEntity.ok( userService.VerifycustomerForStaffBooking(phone));
    }

    @GetMapping("/canmodifi/{id}")
    public ResponseEntity<Boolean> getCanmodifi(@PathVariable int id) {
        return ResponseEntity.ok(userService.canModifyUser(id));
    }
}
