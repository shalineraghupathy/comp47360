package com.data.service.dataservice.controller;


import com.data.service.dataservice.entity.Park;
import com.data.service.dataservice.entity.ParkOfHeatMap;
import com.data.service.dataservice.entity.ParkOfUser;
import com.data.service.dataservice.service.ParkService;
import com.data.service.dataservice.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/parks")
public class ParkController {

    @Autowired
    private ParkService parkService;

    @Autowired
    private JwtUtil jwtUtil;


    @GetMapping("/findAll")
    public List<Park> findAll() {
        return parkService.findAll();
    }

    @GetMapping("/findNearby")
    public List<ParkOfUser> findNearbyParks(@RequestParam double userLat, @RequestParam double userLon, @RequestParam int playTime) {
        return parkService.findNearbyParks(userLat, userLon, playTime);
    }

    @GetMapping("/predictAll")
    public List<ParkOfHeatMap> predictAll(@RequestParam int time) {
        return parkService.predictAll(time);
    }

    @GetMapping("/findNearby2")
    public ResponseEntity<List<ParkOfUser>> findNearbyParks2(HttpServletRequest request, @RequestParam double userLat, @RequestParam double userLon, @RequestParam int playTime) {

        String token = request.getHeader("Authorization");
//        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7); // Remove "Bearer " prefix
            jwtUtil.validateToken(token);
            String userEmail = jwtUtil.extractUsername(token);
            return ResponseEntity.status(200).body(parkService.findNearbyParks2(userLat, userLon, playTime, userEmail));
//        } else {
//            return ResponseEntity.status(401).body("Invalid token.");
//        }
    }
    @PostMapping("/addFavourites")
    public ResponseEntity<String> addUserFavourite(HttpServletRequest request, @RequestParam String parkID) {
        String token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7); // Remove "Bearer " prefix
            jwtUtil.validateToken(token);
            String userEmail = jwtUtil.extractUsername(token);
            parkService.addUserFavourite(userEmail, parkID);
            return ResponseEntity.ok("Favourite added successfully.");
        } else {
            return ResponseEntity.status(401).body("Invalid token.");
        }
    }

    @DeleteMapping("/removeFavourites")
    public ResponseEntity<String> removeFavourites(HttpServletRequest request, @RequestParam String parkID) {
        String token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
            try{
                // Remove "Bearer " prefix
                jwtUtil.validateToken(token);
            }
            catch(Exception e){
                return ResponseEntity.status(401).body("Invalid token.");
            }
            String userEmail = jwtUtil.extractUsername(token);
            parkService.removeUserFavourite(userEmail, parkID);
            return ResponseEntity.ok("Favourite removed successfully.");
        } else {
            return ResponseEntity.status(401).body("Invalid token.");
        }
    }
}
