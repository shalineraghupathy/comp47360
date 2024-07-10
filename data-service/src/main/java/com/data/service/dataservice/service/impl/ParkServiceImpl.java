package com.data.service.dataservice.service.impl;

import com.data.service.dataservice.entity.Entrance;
import com.data.service.dataservice.entity.Park;
import com.data.service.dataservice.entity.ParkOfUser;
import com.data.service.dataservice.repository.ParkMapper;
import com.data.service.dataservice.service.ParkService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class ParkServiceImpl implements ParkService {

    @Autowired
    private ParkMapper parkMapper;

    private List<Park> parkList = new ArrayList<>();

    private static final double EARTH_RADIUS_KM = 6371.0;

    @PostConstruct
    public void initializeParkData() {
        List<Park> allParks = parkMapper.findAll();
        for (Park park : allParks) {
            park.setEntrances(park.parseEntrances(park.getParkEntrance()));
        }
        parkList = allParks;
    }
    @Override
    public List<Park> findAll() {
        return parkList;
    }

    @Override
    public List<ParkOfUser> findNearbyParks(double userLat, double userLon, int playTime) {
        List<ParkOfUser> nearbyParks = new ArrayList<>();

        for (Park park : parkList) {
            double minDistance = Double.MAX_VALUE;
            for (Entrance entrance : park.getEntrances()) {
                double distance = calculateDistance(userLat, userLon, entrance.getLat(), entrance.getLon());
                if (distance < minDistance) {
                    minDistance = distance;
                }
            }

//            Unit: km, can be changed as needed
            if (minDistance < 4.0) {
                nearbyParks.add(new ParkOfUser(park, minDistance, predictBusyness(park.getParkId(), playTime)));
            }
        }

        return nearbyParks;
    }

    @Override
    public double predictBusyness(String parkId, int playTime) {
        // Fake Impl!
        Random random = new Random();
        return random.nextDouble() * 100;
    }

    private static double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) *
                        Math.sin(dLon / 2) * Math.sin(dLon / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return EARTH_RADIUS_KM * c;
    }
}
