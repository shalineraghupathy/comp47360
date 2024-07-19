def determine_season(month):
    """
    Determine the meteorological season based on the month.
    """
    seasons = {
    1: 'Winter', 2: 'Winter', 3: 'Spring', 4: 'Spring', 5: 'Spring',
    6: 'Summer', 7: 'Summer', 8: 'Summer', 9: 'Autumn', 10: 'Autumn',
    11: 'Autumn', 12: 'Winter'
    }

    season_name=seasons.get(month)
    season_map= {'Spring': 1, 'Autumn': 2, 'Summer': 3, 'Winter': 4}

    return season_map.get(season_name)