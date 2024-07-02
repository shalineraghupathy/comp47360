package com.data.service.dataservice.entity;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.List;

public class Park {
    private Integer parkId;
    private String parkName;
    private String parkEntrance;
    private Integer isToilet;
    private Integer isCoffeeShop;
    private double distance;
    private double busyness;
    private List<Entrance> entrances;

    // Getters and Setters

    public Integer getParkId() {
        return parkId;
    }

    public void setParkId(Integer parkId) {
        this.parkId = parkId;
    }

    public String getParkName() {
        return parkName;
    }

    public void setParkName(String parkName) {
        this.parkName = parkName;
    }

    public String getParkEntrance() {
        return parkEntrance;
    }

    public void setParkEntrance(String parkEntrance) {
        this.parkEntrance = parkEntrance;
    }

    public Integer getIsToilet() {
        return isToilet;
    }

    public void setIsToilet(Integer isToilet) {
        this.isToilet = isToilet;
    }

    public Integer getIsCoffeeShop() {
        return isCoffeeShop;
    }

    public void setIsCoffeeShop(Integer isCoffeeShop) {
        this.isCoffeeShop = isCoffeeShop;
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

    public List<Entrance> getEntrances() {
        return entrances;
    }

    public void setEntrances(List<Entrance> entrances) {
        this.entrances = entrances;
    }

    public List<Entrance> parseEntrances(String entranceJson) {
        Gson gson = new Gson();
        Type listType = new TypeToken<List<Entrance>>() {}.getType();
        return gson.fromJson(entranceJson, listType);
    }
}
