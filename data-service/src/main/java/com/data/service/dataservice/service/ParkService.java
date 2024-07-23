package com.data.service.dataservice.service;


import com.data.service.dataservice.entity.Park;
import com.data.service.dataservice.entity.ParkOfUser;

import java.util.List;

public interface ParkService {
    void initializeParkData();
    List<Park> findAll();
    List<ParkOfUser> findNearbyParks(double userLat, double userLon, int playTime);
    double predictBusyness(String parkId, int playTime);
    void addUserFavourite(String userEmail, String parkID );
    void removeUserFavourite(String userEmail, String parkID);
}