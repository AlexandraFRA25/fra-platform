DROP VIEW IF EXISTS extent_of_forest_view;
CREATE VIEW extent_of_forest_view AS
(
WITH extent_of_forest AS (
    SELECT *, row_number() OVER (PARTITION BY country_iso, year) AS row_number
    FROM (
        SELECT n.country_iso,
               n.year,
               1                        AS source,
               n.forest_area,
               n.other_wooded_land_area AS other_wooded_land
        FROM ndp_view n
        UNION
        SELECT f.country_iso,
               f.year,
               2 AS source,
               f.forest_area,
               f.other_wooded_land
        FROM eof_fra_values f
        ORDER BY 1, 2, 3
    ) AS q
)
SELECT e.country_iso,
       'other_wooded_land'                                   AS variable,
       SUM(e.other_wooded_land) FILTER (WHERE e.year = 1990) AS "1990",
       SUM(e.other_wooded_land) FILTER (WHERE e.year = 2000) AS "2000",
       SUM(e.other_wooded_land) FILTER (WHERE e.year = 2010) AS "2010",
       SUM(e.other_wooded_land) FILTER (WHERE e.year = 2015) AS "2015",
       SUM(e.other_wooded_land) FILTER (WHERE e.year = 2020) AS "2020"
FROM extent_of_forest e
WHERE e.row_number = 1
GROUP BY e.country_iso
UNION
SELECT e.country_iso,
       'forest_area'                                   AS variable,
       SUM(e.forest_area) FILTER (WHERE e.year = 1990) AS "1990",
       SUM(e.forest_area) FILTER (WHERE e.year = 2000) AS "2000",
       SUM(e.forest_area) FILTER (WHERE e.year = 2010) AS "2010",
       SUM(e.forest_area) FILTER (WHERE e.year = 2015) AS "2015",
       SUM(e.forest_area) FILTER (WHERE e.year = 2020) AS "2020"
FROM extent_of_forest e
WHERE e.row_number = 1
GROUP BY e.country_iso
ORDER BY 1, 2
    );
  