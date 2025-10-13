package com.dnaeasy.dnaeasy.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentReportResponse {
  Map<String, Integer> comments;
}
