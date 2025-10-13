package com.dnaeasy.dnaeasy.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppoinmetnAssignRequest {

    private   int appoinmetnId;
     private int personId;
}
