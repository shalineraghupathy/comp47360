package com.data.service.dataservice.entity;

public class ParkOfUser {

    private Park park;

    private double distance;

    private double busyness;

    public ParkOfUser(Park park, double distance, double busyness) {
        this.park = park;
        this.distance = distance;
        this.busyness = busyness;
    }

    public Park getPark() {
        return park;
    }

    public void setPark(Park park) {
        this.park = park;
    }

    public double getDistance() {
        return distance;
    }

    public void setDistance(double distance) {
        this.distance = distance;
    }

    public double getBusyness() {
        return busyness;
    }

    public void setBusyness(double busyness) {
        this.busyness = busyness;
    }
}
