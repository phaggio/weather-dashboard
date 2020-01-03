let forecastWeatherObj = {
    "cod": "200",
    "message": 0,
    "cnt": 40,
    "list": [
        {
            "dt": 1577761200,
            "main": {
                "temp": 280.25,
                "feels_like": 276.79,
                "temp_min": 280.25,
                "temp_max": 280.3,
                "pressure": 1026,
                "sea_level": 1026,
                "grnd_level": 1017,
                "humidity": 86,
                "temp_kf": -0.05
            },
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "clouds": {
                "all": 98
            },
            "wind": {
                "speed": 3.31,
                "deg": 189
            },
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2019-12-31 03:00:00"
        },
        {
            "dt": 1577772000, "main": { "temp": 279.45, "feels_like": 275.71, "temp_min": 279.45, "temp_max": 279.49, "pressure": 1024, "sea_level": 1024, "grnd_level": 1016, "humidity": 84, "temp_kf": -0.04 }, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "clouds": { "all": 98 }, "wind": { "speed": 3.41, "deg": 181 }, "sys": { "pod": "n" }, "dt_txt": "2019-12-31 06:00:00"
        },
        {
            "dt": 1577782800, "main": { "temp": 279.71, "feels_like": 275.64, "temp_min": 279.71, "temp_max": 279.73, "pressure": 1022, "sea_level": 1022, "grnd_level": 1014, "humidity": 83, "temp_kf": -0.02 }, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10n" }], "clouds": { "all": 100 }, "wind": { "speed": 3.9, "deg": 190 }, "rain": { "3h": 0.19 }, "sys": { "pod": "n" }, "dt_txt": "2019-12-31 09:00:00"
        },
        {
            "dt": 1577793600, "main": { "temp": 279.74, "feels_like": 275.47, "temp_min": 279.74, "temp_max": 279.75, "pressure": 1021, "sea_level": 1021, "grnd_level": 1013, "humidity": 78, "temp_kf": -0.01 }, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "clouds": { "all": 100 }, "wind": { "speed": 3.96, "deg": 203 }, "sys": { "pod": "n" }, "dt_txt": "2019-12-31 12:00:00"
        },
        {
            "dt": 1577804400, "main": { "temp": 279.79, "feels_like": 274.26, "temp_min": 279.79, "temp_max": 279.79, "pressure": 1017, "sea_level": 1017, "grnd_level": 1009, "humidity": 86, "temp_kf": 0 }, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10n" }], "clouds": { "all": 100 }, "wind": { "speed": 6.15, "deg": 211 }, "rain": { "3h": 0.63 }, "sys": { "pod": "n" }, "dt_txt": "2019-12-31 15:00:00"
        },
        {
            "dt": 1577815200, "main": { "temp": 281.24, "feels_like": 274.98, "temp_min": 281.24, "temp_max": 281.24, "pressure": 1015, "sea_level": 1015, "grnd_level": 1008, "humidity": 83, "temp_kf": 0 }, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10d" }], "clouds": { "all": 100 }, "wind": { "speed": 7.45, "deg": 206 }, "rain": { "3h": 0.88 }, "sys": { "pod": "d" }, "dt_txt": "2019-12-31 18:00:00"
        },
        {
            "dt": 1577826000, "main": { "temp": 281.03, "feels_like": 275.45, "temp_min": 281.03, "temp_max": 281.03, "pressure": 1011, "sea_level": 1011, "grnd_level": 1003, "humidity": 89, "temp_kf": 0 }, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10d" }], "clouds": { "all": 100 }, "wind": { "speed": 6.72, "deg": 197 }, "rain": { "3h": 2 }, "sys": { "pod": "d" }, "dt_txt": "2019-12-31 21:00:00"
        },
        {
            "dt": 1577836800, "main": { "temp": 281.94, "feels_like": 276.07, "temp_min": 281.94, "temp_max": 281.94, "pressure": 1008, "sea_level": 1008, "grnd_level": 999, "humidity": 90, "temp_kf": 0 }, "weather": [{ "id": 501, "main": "Rain", "description": "moderate rain", "icon": "10d" }], "clouds": { "all": 100 }, "wind": { "speed": 7.46, "deg": 199 }, "rain": { "3h": 4 }, "sys": { "pod": "d" }, "dt_txt": "2020-01-01 00:00:00"
        },
        {
            "dt": 1577847600, "main": { "temp": 285.3, "feels_like": 280.25, "temp_min": 285.3, "temp_max": 285.3, "pressure": 1005, "sea_level": 1005, "grnd_level": 997, "humidity": 89, "temp_kf": 0 }, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10n" }], "clouds": { "all": 100 }, "wind": { "speed": 7.43, "deg": 222 }, "rain": { "3h": 1.63 }, "sys": { "pod": "n" }, "dt_txt": "2020-01-01 03:00:00"
        },
        {
            "dt": 1577858400, "main": { "temp": 284.79, "feels_like": 279.22, "temp_min": 284.79, "temp_max": 284.79, "pressure": 1004, "sea_level": 1004, "grnd_level": 996, "humidity": 86, "temp_kf": 0 }, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10n" }], "clouds": { "all": 86 }, "wind": { "speed": 7.78, "deg": 233 }, "rain": { "3h": 1.13 }, "sys": { "pod": "n" }, "dt_txt": "2020-01-01 06:00:00"
        },
        {
            "dt": 1577869200, "main": { "temp": 284.01, "feels_like": 278.24, "temp_min": 284.01, "temp_max": 284.01, "pressure": 1003, "sea_level": 1003, "grnd_level": 996, "humidity": 79, "temp_kf": 0 }, "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04n" }], "clouds": { "all": 68 }, "wind": { "speed": 7.36, "deg": 235 }, "sys": { "pod": "n" }, "dt_txt": "2020-01-01 09:00:00"
        },
        {
            "dt": 1577880000, "main": { "temp": 283.08, "feels_like": 278.09, "temp_min": 283.08, "temp_max": 283.08, "pressure": 1005, "sea_level": 1005, "grnd_level": 997, "humidity": 76, "temp_kf": 0 }, "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04n" }], "clouds": { "all": 77 }, "wind": { "speed": 5.79, "deg": 237 }, "sys": { "pod": "n" }, "dt_txt": "2020-01-01 12:00:00"
        },
        {
            "dt": 1577890800, "main": { "temp": 281.27, "feels_like": 277.71, "temp_min": 281.27, "temp_max": 281.27, "pressure": 1005, "sea_level": 1005, "grnd_level": 997, "humidity": 82, "temp_kf": 0 }, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10n" }], "clouds": { "all": 100 }, "wind": { "speed": 3.54, "deg": 236 }, "rain": { "3h": 0.25 }, "sys": { "pod": "n" }, "dt_txt": "2020-01-01 15:00:00"
        },
        {
            "dt": 1577901600, "main": { "temp": 282.64, "feels_like": 279.62, "temp_min": 282.64, "temp_max": 282.64, "pressure": 1008, "sea_level": 1008, "grnd_level": 1000, "humidity": 78, "temp_kf": 0 }, "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04d" }], "clouds": { "all": 75 }, "wind": { "speed": 2.95, "deg": 235 }, "sys": { "pod": "d" }, "dt_txt": "2020-01-01 18:00:00"
        },
        {
            "dt": 1577912400, "main": { "temp": 285.15, "feels_like": 280.81, "temp_min": 285.15, "temp_max": 285.15, "pressure": 1009, "sea_level": 1009, "grnd_level": 1001, "humidity": 65, "temp_kf": 0 }, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01d" }], "clouds": { "all": 0 }, "wind": { "speed": 4.77, "deg": 242 }, "sys": { "pod": "d" }, "dt_txt": "2020-01-01 21:00:00"
        },
        {
            "dt": 1577923200, "main": { "temp": 281.68, "feels_like": 279.19, "temp_min": 281.68, "temp_max": 281.68, "pressure": 1011, "sea_level": 1011, "grnd_level": 1003, "humidity": 72, "temp_kf": 0 }, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01d" }], "clouds": { "all": 2 }, "wind": { "speed": 1.61, "deg": 222 }, "sys": { "pod": "d" }, "dt_txt": "2020-01-02 00:00:00"
        },
        {
            "dt": 1577934000, "main": { "temp": 279.06, "feels_like": 276.29, "temp_min": 279.06, "temp_max": 279.06, "pressure": 1014, "sea_level": 1014, "grnd_level": 1005, "humidity": 72, "temp_kf": 0 }, "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04n" }], "clouds": { "all": 80 }, "wind": { "speed": 1.39, "deg": 218 }, "sys": { "pod": "n" }, "dt_txt": "2020-01-02 03:00:00"
        },
        {
            "dt": 1577944800, "main": { "temp": 278.64, "feels_like": 275.47, "temp_min": 278.64, "temp_max": 278.64, "pressure": 1017, "sea_level": 1017, "grnd_level": 1008, "humidity": 81, "temp_kf": 0 }, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "clouds": { "all": 90 }, "wind": { "speed": 2.26, "deg": 216 }, "sys": { "pod": "n" }, "dt_txt": "2020-01-02 06:00:00"
        },
        {
            "dt": 1577955600, "main": { "temp": 277.46, "feels_like": 274.45, "temp_min": 277.46, "temp_max": 277.46, "pressure": 1019, "sea_level": 1019, "grnd_level": 1011, "humidity": 84, "temp_kf": 0 }, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10n" }], "clouds": { "all": 100 }, "wind": { "speed": 1.88, "deg": 234 }, "rain": { "3h": 0.19 }, "sys": { "pod": "n" }, "dt_txt": "2020-01-02 09:00:00"
        },
        {
            "dt": 1577966400, "main": { "temp": 277.42, "feels_like": 275.15, "temp_min": 277.42, "temp_max": 277.42, "pressure": 1020, "sea_level": 1020, "grnd_level": 1013, "humidity": 82, "temp_kf": 0 }, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10n" }], "clouds": { "all": 100 }, "wind": { "speed": 0.73, "deg": 160 }, "rain": { "3h": 0.19 }, "sys": { "pod": "n" }, "dt_txt": "2020-01-02 12:00:00"
        },
        {
            "dt": 1577977200, "main": { "temp": 277.23, "feels_like": 274.29, "temp_min": 277.23, "temp_max": 277.23, "pressure": 1021, "sea_level": 1021, "grnd_level": 1013, "humidity": 87, "temp_kf": 0 }, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "clouds": { "all": 100 }, "wind": { "speed": 1.83, "deg": 202 }, "sys": { "pod": "n" }, "dt_txt": "2020-01-02 15:00:00"
        },
        {
            "dt": 1577988000, "main": { "temp": 278.74, "feels_like": 275.01, "temp_min": 278.74, "temp_max": 278.74, "pressure": 1021, "sea_level": 1021, "grnd_level": 1013, "humidity": 81, "temp_kf": 0 }, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d" }], "clouds": { "all": 100 }, "wind": { "speed": 3.08, "deg": 194 }, "sys": { "pod": "d" }, "dt_txt": "2020-01-02 18:00:00"
        },
        {
            "dt": 1577998800, "main": { "temp": 279.32, "feels_like": 275.51, "temp_min": 279.32, "temp_max": 279.32, "pressure": 1018, "sea_level": 1018, "grnd_level": 1011, "humidity": 83, "temp_kf": 0 }, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10d" }], "clouds": { "all": 100 }, "wind": { "speed": 3.43, "deg": 192 }, "rain": { "3h": 0.38 }, "sys": { "pod": "d" }, "dt_txt": "2020-01-02 21:00:00"
        },
        {
            "dt": 1578009600, "main": { "temp": 278.35, "feels_like": 274.13, "temp_min": 278.35, "temp_max": 278.35, "pressure": 1016, "sea_level": 1016, "grnd_level": 1008, "humidity": 91, "temp_kf": 0 }, "weather": [{ "id": 501, "main": "Rain", "description": "moderate rain", "icon": "10d" }], "clouds": { "all": 100 }, "wind": { "speed": 4.11, "deg": 156 }, "rain": { "3h": 3.56 }, "sys": { "pod": "d" }, "dt_txt": "2020-01-03 00:00:00"
        },
        {
            "dt": 1578020400, "main": { "temp": 280.51, "feels_like": 275.63, "temp_min": 280.51, "temp_max": 280.51, "pressure": 1014, "sea_level": 1014, "grnd_level": 1006, "humidity": 88, "temp_kf": 0 }, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10n" }], "clouds": { "all": 100 }, "wind": { "speed": 5.51, "deg": 188 }, "rain": { "3h": 2.06 }, "sys": { "pod": "n" }, "dt_txt": "2020-01-03 03:00:00"
        },
        {
            "dt": 1578031200, "main": { "temp": 281.89, "feels_like": 276.15, "temp_min": 281.89, "temp_max": 281.89, "pressure": 1014, "sea_level": 1014, "grnd_level": 1005, "humidity": 87, "temp_kf": 0 }, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10n" }], "clouds": { "all": 100 }, "wind": { "speed": 7.1, "deg": 189 }, "rain": { "3h": 1.31 }, "sys": { "pod": "n" }, "dt_txt": "2020-01-03 06:00:00"
        },
        {
            "dt": 1578042000, "main": { "temp": 282.6, "feels_like": 276.86, "temp_min": 282.6, "temp_max": 282.6, "pressure": 1013, "sea_level": 1013, "grnd_level": 1005, "humidity": 87, "temp_kf": 0 }, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10n" }], "clouds": { "all": 100 }, "wind": { "speed": 7.33, "deg": 193 }, "rain": { "3h": 1.56 }, "sys": { "pod": "n" }, "dt_txt": "2020-01-03 09:00:00"
        },
        {
            "dt": 1578052800, "main": { "temp": 283.1, "feels_like": 277.19, "temp_min": 283.1, "temp_max": 283.1, "pressure": 1013, "sea_level": 1013, "grnd_level": 1005, "humidity": 85, "temp_kf": 0 }, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10n" }], "clouds": { "all": 100 }, "wind": { "speed": 7.62, "deg": 193 }, "rain": { "3h": 1.81 }, "sys": { "pod": "n" }, "dt_txt": "2020-01-03 12:00:00"
        },
        {
            "dt": 1578063600, "main": { "temp": 283.38, "feels_like": 278.02, "temp_min": 283.38, "temp_max": 283.38, "pressure": 1013, "sea_level": 1013, "grnd_level": 1006, "humidity": 81, "temp_kf": 0 }, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10n" }], "clouds": { "all": 100 }, "wind": { "speed": 6.69, "deg": 198 }, "rain": { "3h": 0.69 }, "sys": { "pod": "n" }, "dt_txt": "2020-01-03 15:00:00"
        },
        {
            "dt": 1578074400, "main": { "temp": 282.55, "feels_like": 280.08, "temp_min": 282.55, "temp_max": 282.55, "pressure": 1014, "sea_level": 1014, "grnd_level": 1006, "humidity": 84, "temp_kf": 0 }, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d" }], "clouds": { "all": 100 }, "wind": { "speed": 2.48, "deg": 187 }, "sys": { "pod": "d" }, "dt_txt": "2020-01-03 18:00:00"
        },
        {
            "dt": 1578085200, "main": { "temp": 285.61, "feels_like": 281.4, "temp_min": 285.61, "temp_max": 285.61, "pressure": 1011, "sea_level": 1011, "grnd_level": 1003, "humidity": 66, "temp_kf": 0 }, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d" }], "clouds": { "all": 100 }, "wind": { "speed": 4.79, "deg": 198 }, "sys": { "pod": "d" }, "dt_txt": "2020-01-03 21:00:00"
        },
        {
            "dt": 1578096000, "main": { "temp": 284.28, "feels_like": 280.41, "temp_min": 284.28, "temp_max": 284.28, "pressure": 1008, "sea_level": 1008, "grnd_level": 1001, "humidity": 68, "temp_kf": 0 }, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d" }], "clouds": { "all": 100 }, "wind": { "speed": 4.05, "deg": 190 }, "sys": { "pod": "d" }, "dt_txt": "2020-01-04 00:00:00"
        },
        {
            "dt": 1578106800, "main": { "temp": 284.57, "feels_like": 278.66, "temp_min": 284.57, "temp_max": 284.57, "pressure": 1006, "sea_level": 1006, "grnd_level": 998, "humidity": 66, "temp_kf": 0 }, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10n" }], "clouds": { "all": 100 }, "wind": { "speed": 6.92, "deg": 185 }, "rain": { "3h": 0.63 }, "sys": { "pod": "n" }, "dt_txt": "2020-01-04 03:00:00"
        },
        {
            "dt": 1578117600, "main": { "temp": 281.47, "feels_like": 275.55, "temp_min": 281.47, "temp_max": 281.47, "pressure": 1007, "sea_level": 1007, "grnd_level": 1000, "humidity": 85, "temp_kf": 0 }, "weather": [{ "id": 501, "main": "Rain", "description": "moderate rain", "icon": "10n" }], "clouds": { "all": 100 }, "wind": { "speed": 7.13, "deg": 214 }, "rain": { "3h": 4.44 }, "sys": { "pod": "n" }, "dt_txt": "2020-01-04 06:00:00"
        },
        {
            "dt": 1578128400, "main": { "temp": 280.15, "feels_like": 272.9, "temp_min": 280.15, "temp_max": 280.15, "pressure": 1012, "sea_level": 1012, "grnd_level": 1004, "humidity": 70, "temp_kf": 0 }, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10n" }], "clouds": { "all": 93 }, "wind": { "speed": 7.94, "deg": 221 }, "rain": { "3h": 0.69 }, "sys": { "pod": "n" }, "dt_txt": "2020-01-04 09:00:00"
        },
        {
            "dt": 1578139200, "main": { "temp": 278.53, "feels_like": 271.83, "temp_min": 278.53, "temp_max": 278.53, "pressure": 1017, "sea_level": 1017, "grnd_level": 1009, "humidity": 72, "temp_kf": 0 }, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "clouds": { "all": 95 }, "wind": { "speed": 6.89, "deg": 234 }, "sys": { "pod": "n" }, "dt_txt": "2020-01-04 12:00:00"
        },
        {
            "dt": 1578150000, "main": { "temp": 277.95, "feels_like": 271.93, "temp_min": 277.95, "temp_max": 277.95, "pressure": 1019, "sea_level": 1019, "grnd_level": 1011, "humidity": 78, "temp_kf": 0 }, "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04n" }], "clouds": { "all": 83 }, "wind": { "speed": 6.04, "deg": 221 }, "sys": { "pod": "n" }, "dt_txt": "2020-01-04 15:00:00"
        },
        {
            "dt": 1578160800, "main": { "temp": 279.05, "feels_like": 273.08, "temp_min": 279.05, "temp_max": 279.05, "pressure": 1022, "sea_level": 1022, "grnd_level": 1014, "humidity": 71, "temp_kf": 0 }, "weather": [{ "id": 802, "main": "Clouds", "description": "scattered clouds", "icon": "03d" }], "clouds": { "all": 43 }, "wind": { "speed": 5.92, "deg": 219 }, "sys": { "pod": "d" }, "dt_txt": "2020-01-04 18:00:00"
        },
        {
            "dt": 1578171600, "main": { "temp": 279.94, "feels_like": 274.15, "temp_min": 279.94, "temp_max": 279.94, "pressure": 1021, "sea_level": 1021, "grnd_level": 1013, "humidity": 72, "temp_kf": 0 }, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10d" }], "clouds": { "all": 38 }, "wind": { "speed": 5.91, "deg": 196 }, "rain": { "3h": 0.5 }, "sys": { "pod": "d" }, "dt_txt": "2020-01-04 21:00:00"
        },
        {
            "dt": 1578182400, "main": { "temp": 278.48, "feels_like": 272.56, "temp_min": 278.48, "temp_max": 278.48, "pressure": 1020, "sea_level": 1020, "grnd_level": 1012, "humidity": 90, "temp_kf": 0 }, "weather": [{ "id": 501, "main": "Rain", "description": "moderate rain", "icon": "10d" }], "clouds": { "all": 70 }, "wind": { "speed": 6.53, "deg": 211 }, "rain": { "3h": 4.31 }, "sys": { "pod": "d" }, "dt_txt": "2020-01-05 00:00:00"
        }
    ],
    "city": {
        "id": 5809844,
        "name": "Seattle",
        "coord": {
            "lat": 47.6038,
            "lon": -122.3301
        },
        "country": "US",
        "population": 608660,
        "timezone": -28800,
        "sunrise": 1577721445,
        "sunset": 1577751954
    }
};

let currentWeatherObj = {
    "coord": {
        "lon": -122.33,
        "lat": 47.6
    },
    "weather": [
        {
            "id": 803,
            "main": "Clouds",
            "description": "broken clouds",
            "icon": "04n"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 283.9,
        "feels_like": 278.31,
        "temp_min": 282.04,
        "temp_max": 285.37,
        "pressure": 1004,
        "humidity": 81
    },
    "visibility": 16093,
    "wind": {
        "speed": 7.2, "deg": 220, "gust": 11.3
    },
    "clouds": {
        "all": 75
    },
    "dt": 1577867176,
    "sys": {
        "type": 1, "id": 3417, "country": "US", "sunrise": 1577894250, "sunset": 1577924861
    }, 
    "timezone": -28800, "id": 5809844, "name": "Seattle", "cod": 200
};

let currentUVObj = {
    "lat": 47.6,
    "lon": -122.33,
    "date_iso": "2020-01-01T12:00:00Z",
    "date": 1577880000,
    "value": 0.58
};