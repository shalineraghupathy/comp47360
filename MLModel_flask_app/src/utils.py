import datetime

def determine_season(month):
    """
    Determine the  season based on the month.
    """
    seasons = {
    1: 'Winter', 2: 'Winter', 3: 'Spring', 4: 'Spring', 5: 'Spring',
    6: 'Summer', 7: 'Summer', 8: 'Summer', 9: 'Autumn', 10: 'Autumn',
    11: 'Autumn', 12: 'Winter'
    }

    season_name=seasons.get(month)
    season_map= {'Spring': 1, 'Autumn': 2, 'Summer': 3, 'Winter': 4}

    return season_map.get(season_name)


def check_holiday(dt):
    holidays = {
        "New Year's Day": datetime.datetime(2024, 1, 1),
        "Martin Luther King Jr. Day": datetime.datetime(2024, 1, 15),
        "Presidents' Day": datetime.datetime(2024, 2, 19),
        "Memorial Day": datetime.datetime(2024, 5, 27),
        "Independence Day": datetime.datetime(2024, 7, 4),
        "Labor Day": datetime.datetime(2024, 9, 2),
        "Columbus Day": datetime.datetime(2024, 10, 14),
        "Veterans Day": datetime.datetime(2024, 11, 11),
        "Thanksgiving Day": datetime.datetime(2024, 11, 28),
        "Christmas Day": datetime.datetime(2024, 12, 25)
    }
    return dt in holidays.values()
