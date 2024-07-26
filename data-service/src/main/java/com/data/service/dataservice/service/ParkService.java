package com.data.service.dataservice.service;


import com.data.service.dataservice.entity.Park;
import com.data.service.dataservice.entity.ParkOfHeatMap;
import com.data.service.dataservice.entity.ParkOfUser;

import java.util.List;

public interface ParkService {
    void initializeParkData();
    List<Park> findAll();
    List<ParkOfUser> findNearbyParks(double userLat, double userLon, int playTime);

    List<ParkOfUser> findNearbyParks2(double userLat, double userLon, int playTime, String UserEmail);
    double predictBusyness(String parkId, int playTime);

    List<ParkOfHeatMap> predictAll(int time);

    void addUserFavourite(String userEmail, String parkID );
    void removeUserFavourite(String userEmail, String parkID);
    List<Park> listAllUserFavourites(String userEmail);

}