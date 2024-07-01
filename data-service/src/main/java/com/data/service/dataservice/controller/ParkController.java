package com.data.service.dataservice.controller;


import com.data.service.dataservice.entity.Park;
import com.data.service.dataservice.entity.ParkOfUser;
import com.data.service.dataservice.service.ParkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/parks")
public class ParkController {

    @Autowired
    private ParkService parkService;

    @GetMapping("/findAll")
    public List<Park> findAll() {
        return parkService.findAll();
    }

    @GetMapping("/findNearby")
    public List<ParkOfUser> findNearbyParks(@RequestParam double userLat, @RequestParam double userLon, @RequestParam int playTime) {
        return parkService.findNearbyParks(userLat, userLon, playTime);
    }
}
