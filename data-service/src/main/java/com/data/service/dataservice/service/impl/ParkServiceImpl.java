package com.data.service.dataservice.service.impl;

import com.data.service.dataservice.entity.*;
import com.data.service.dataservice.modelcaller.FlaskClient;
import com.data.service.dataservice.repository.ParkMapper;
import com.data.service.dataservice.repository.UserFavouritesRepository;
import com.data.service.dataservice.repository.UserRepository;
import com.data.service.dataservice.service.ParkService;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ParkServiceImpl implements ParkService {

    @Autowired
    private ParkMapper parkMapper;

    @Autowired
    private UserFavouritesRepository userFavouritesRepository;

    private List<Park> parkList = new ArrayList<>();

    private static final double EARTH_RADIUS_KM = 6371.0;

    @Autowired
    private UserRepository userRepository;

    @Value("${routekey}")
    private String googleApiKey;

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
        List<Park> qualifiedParks = new ArrayList<>();

        for (Park park : parkList) {
            double minDistance = Double.MAX_VALUE;
            for (Entrance entrance : park.getEntrances()) {
                double distance = calculateDistance(userLat, userLon, entrance.getLat(), entrance.getLon());
                if (distance < minDistance) {
                    minDistance = distance;
                }
            }

//            Unit: km, can be changed as needed
            if (minDistance < 2.0) {
                qualifiedParks.add(park);
            }
        }
        for (Park park : qualifiedParks) {
            double minRouteDistance = Double.MAX_VALUE;
            for (Entrance entrance : park.getEntrances()) {
                double routeDistance = getRouteDistance(userLat, userLon, entrance.getLat(), entrance.getLon());
                if (routeDistance < minRouteDistance) {
                    minRouteDistance = routeDistance;
                }
            }
            double routeDistanceInKm = minRouteDistance / 1000.0;
            nearbyParks.add(new ParkOfUser(park, routeDistanceInKm, predictBusyness(park.getParkId(), playTime)));
        }

        return nearbyParks;
    }

    @Override
    public List<ParkOfUser> findNearbyParks2(double userLat, double userLon, int playTime, String userEmail) {

        Optional<UserEntity> userEntityOpt =  userRepository.findByUserEmail(userEmail);
        Long userId = userEntityOpt.get().getUserId();

        List<ParkOfUser> nearbyParks = new ArrayList<>();
        List<Park> qualifiedParks = new ArrayList<>();

        for (Park park : parkList) {
            double minDistance = Double.MAX_VALUE;
            for (Entrance entrance : park.getEntrances()) {
                double distance = calculateDistance(userLat, userLon, entrance.getLat(), entrance.getLon());
                if (distance < minDistance) {
                    minDistance = distance;
                }
            }

//            Unit: km, can be changed as needed
            if (minDistance < 2.0) {
                qualifiedParks.add(park);
            }
        }
        for (Park park : qualifiedParks) {
            double minRouteDistance = Double.MAX_VALUE;
            for (Entrance entrance : park.getEntrances()) {
                double routeDistance = getRouteDistance(userLat, userLon, entrance.getLat(), entrance.getLon());
                if (routeDistance < minRouteDistance) {
                    minRouteDistance = routeDistance;
                }
            }
            UserFavouritesKey key = new UserFavouritesKey(userId, park.getParkId());
            double routeDistanceInKm = minRouteDistance / 1000.0;
            nearbyParks.add(new ParkOfUser(park, routeDistanceInKm, predictBusyness(park.getParkId(), playTime), userFavouritesRepository.existsById(key)));
        }

        return nearbyParks;
    }

    @Override
    public double predictBusyness(String parkId, int playTime) {
//        // Fake Impl!
//        Random random = new Random();
//        return random.nextDouble() * 100;
        // Calling the ML model
        try {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("timestamp", playTime); // Use playTime as the timestamp
            jsonObject.put("park_id", parkId);

            JSONObject response = FlaskClient.sendPostRequest(jsonObject);
            return response.getJSONArray("prediction").getDouble(0);
        } catch (Exception e) {
            e.printStackTrace();
            return -1; // Return -1 or any other appropriate error value
        }
    }

    @Override
    public List<ParkOfHeatMap> predictAll(int time) {
        return parkList.stream().map(park -> new ParkOfHeatMap(park, predictBusyness(park.getParkId(), time))).toList();
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

    @Transactional
    public void addUserFavourite(String userEmail, String parkID ){
        Optional<UserEntity> userEntityOpt =  userRepository.findByUserEmail(userEmail);
        UserFavouritesKey key = new UserFavouritesKey(userEntityOpt.get().getUserId(), parkID);
        UserFavourites userFavourites = new UserFavourites(key);
        userFavouritesRepository.save(userFavourites);
    }

    @Transactional
    public void removeUserFavourite(String userEmail, String parkID ){
        Optional<UserEntity> userEntityOpt =  userRepository.findByUserEmail(userEmail);
        UserFavouritesKey key = new UserFavouritesKey(userEntityOpt.get().getUserId(), parkID);
        UserFavourites userFavourites = new UserFavourites(key);
        userFavouritesRepository.delete(userFavourites);
    }

    @Override
    public List<Park> listAllUserFavourites(String userEmail) {
        List<String> parkIds = userRepository.findByUserEmail(userEmail)
                .map(user -> userFavouritesRepository.findByUserId(user.getUserId())
                        .stream()
                        .map(fav -> fav.getId().getParkID())
                        .collect(Collectors.toList()))
                .orElse(Collections.emptyList());

        return parkList.stream()
                .filter(park -> parkIds.contains(park.getParkId()))
                .collect(Collectors.toList());
    }

    private double getRouteDistance(double startLat, double startLon, double endLat, double endLon) {
        String url = String.format(
                "https://maps.googleapis.com/maps/api/directions/json?origin=%f,%f&destination=%f,%f&mode=walking&key=%s",
                startLat, startLon, endLat, endLon, googleApiKey
        );

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        JSONObject jsonObject = new JSONObject(response.getBody());
        JSONArray routes = jsonObject.getJSONArray("routes");
        if (routes.length() > 0) {
            JSONObject legs = routes.getJSONObject(0).getJSONArray("legs").getJSONObject(0);
            return legs.getJSONObject("distance").getInt("value");
        }
        return Double.MAX_VALUE;
    }



}
