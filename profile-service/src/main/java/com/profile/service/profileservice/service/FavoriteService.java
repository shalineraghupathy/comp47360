package com.profile.service.profileservice.service;

import java.util.List;

public interface FavoriteService {

    int addFavorite(String parkId);

    int deleteFavorite(String parkId);

    List<String> queryFavorite();
}
