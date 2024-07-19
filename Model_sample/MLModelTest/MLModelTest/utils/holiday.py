from holidays import country_holidays

def check_holiday(dt):
    
    NYC_holidays = country_holidays('US', subdiv='NY')
    return dt in NYC_holidays