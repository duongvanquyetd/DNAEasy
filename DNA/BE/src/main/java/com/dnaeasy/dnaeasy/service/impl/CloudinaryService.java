package com.dnaeasy.dnaeasy.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class CloudinaryService {

    public String uploadFile(MultipartFile file) {
        // Giả định tạm: Upload xong trả về đường dẫn
        // TODO: Thay bằng gọi SDK thật nếu có
        return "https://res.cloudinary.com/demo/image/upload/" + file.getOriginalFilename();
    }
}