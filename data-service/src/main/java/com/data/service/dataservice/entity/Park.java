package com.data.service.dataservice.entity;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.List;

public class Park {
    private String parkId;
    private String parkName;
    private String parkEntrance;
    private List<Entrance> entrances;
    private int isCafe;
    private int isPlayground;
    private int isToilet;
    private int isToiletHandicapAccess;
    private int isRestaurant;
    private int isShelter;
    private int isDrinkingWater;
    private int isBar;
    private int isBench;
    private int isGarden;
    private int isFountain;
    private int isMonument;


    // Getters and Setters

    public String getParkId() {
        return parkId;
    }

    public void setParkId(String parkId) {
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

    public List<Entrance> getEntrances() {
        return entrances;
    }

    public void setEntrances(List<Entrance> entrances) {
        this.entrances = entrances;
    }

    public int getIsCafe() {
        return isCafe;
    }

    public void setIsCafe(int isCafe) {
        this.isCafe = isCafe;
    }

    public int getIsPlayground() {
        return isPlayground;
    }

    public void setIsPlayground(int isPlayground) {
        this.isPlayground = isPlayground;
    }

    public int getIsToilet() {
        return isToilet;
    }

    public void setIsToilet(int isToilet) {
        this.isToilet = isToilet;
    }

    public int getIsToiletHandicapAccess() {
        return isToiletHandicapAccess;
    }

    public void setIsToiletHandicapAccess(int isToiletHandicapAccess) {
        this.isToiletHandicapAccess = isToiletHandicapAccess;
    }

    public int getIsRestaurant() {
        return isRestaurant;
    }

    public void setIsRestaurant(int isRestaurant) {
        this.isRestaurant = isRestaurant;
    }

    public int getIsShelter() {
        return isShelter;
    }

    public void setIsShelter(int isShelter) {
        this.isShelter = isShelter;
    }

    public int getIsDrinkingWater() {
        return isDrinkingWater;
    }

    public void setIsDrinkingWater(int isDrinkingWater) {
        this.isDrinkingWater = isDrinkingWater;
    }

    public int getIsBar() {
        return isBar;
    }

    public void setIsBar(int isBar) {
        this.isBar = isBar;
    }

    public int getIsBench() {
        return isBench;
    }

    public void setIsBench(int isBench) {
        this.isBench = isBench;
    }

    public int getIsGarden() {
        return isGarden;
    }

    public void setIsGarden(int isGarden) {
        this.isGarden = isGarden;
    }

    public int getIsFountain() {
        return isFountain;
    }

    public void setIsFountain(int isFountain) {
        this.isFountain = isFountain;
    }

    public int getIsMonument() {
        return isMonument;
    }

    public void setIsMonument(int isMonument) {
        this.isMonument = isMonument;
    }

    public List<Entrance> parseEntrances(String entranceJson) {
        Gson gson = new Gson();
        Type listType = new TypeToken<List<Entrance>>() {}.getType();
        return gson.fromJson(entranceJson, listType);
    }
}
