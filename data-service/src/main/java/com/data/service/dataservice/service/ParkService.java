package com.data.service.dataservice.service;



import com.data.service.dataservice.entity.Park;

import java.util.List;

public interface ParkService {
    void initializeParkData();
    List<Park> findAll();
    List<Park> findNearbyParks(double userLat, double userLon, int playTime);
    double predictBusyness(int parkId, int playTime);
}