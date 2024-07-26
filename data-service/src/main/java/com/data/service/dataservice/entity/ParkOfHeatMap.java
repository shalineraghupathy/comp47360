package com.data.service.dataservice.entity;

public class ParkOfHeatMap {

    private Park park;

    private double busyness;

    public ParkOfHeatMap(Park park, double busyness) {
        this.park = park;
        this.busyness = busyness;
    }

    public Park getPark() {
        return park;
    }

    public void setPark(Park park) {
        this.park = park;
    }

    public double getBusyness() {
        return busyness;
    }

    public void setBusyness(double busyness) {
        this.busyness = busyness;
    }
}
