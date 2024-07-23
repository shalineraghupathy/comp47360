package com.data.service.dataservice.entity;
import jakarta.persistence.*;

@Entity
@Table(name = "user_favourites")
public class UserFavourites {

    @EmbeddedId
    private UserFavouritesKey id;

    // Default constructor
    public UserFavourites() {
    }

    public UserFavourites(UserFavouritesKey id) {
        this.id = id;
    }

    // Getters and Setters
    public UserFavouritesKey getId() {
        return id;
    }

    public void setId(UserFavouritesKey id) {
        this.id = id;
    }
}
