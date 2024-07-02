package com.data.service.dataservice.service;

public class ManhattanDistanceTest {

    private static final double EARTH_RADIUS_KM = 6371.0;

    public static void main(String[] args) {
        double[][] points = {
                {40.7831, -73.9712},
                {40.748817, -73.985428},
                {40.758896, -73.985130},
                {40.706192, -74.009160},
                {40.730610, -73.935242},
                {40.752726, -73.977229},
                {40.761581, -73.977631},
                {40.807536, -73.962573},
                {40.748441, -73.985664},
                {40.742054, -74.000629}
        };

        for (int i = 0; i < points.length; i++) {
            for (int j = i + 1; j < points.length; j++) {
                double distance = calculateDistance(points[i][0], points[i][1], points[j][0], points[j][1]);
                System.out.println("Distance between point " + (i + 1) + " and point " + (j + 1) + " is: " + distance + " km");
            }
        }
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

