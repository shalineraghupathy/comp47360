package com.data.service.dataservice.entity;

import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class UserFavouritesKey implements Serializable {

    private Long userID;
    private String parkID;

    // Default constructor
    public UserFavouritesKey() {
    }

    public UserFavouritesKey(Long userID, String parkID) {
        this.userID = userID;
        this.parkID = parkID;
    }

    // Getters and Setters
    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    public String getParkID() {
        return parkID;
    }

    public void setParkID(String parkID) {
        this.parkID = parkID;
    }

    // Override equals and hashCode
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserFavouritesKey that = (UserFavouritesKey) o;
        return userID == that.userID && parkID.equals(that.parkID) ;
    }

    @Override
    public int hashCode() {
        return Objects.hash(userID, parkID);
    }
}
