SELECT COUNT(*) AS CNT FROM Recipe WHERE MATCH (recipe_name) AGAINST(%(recipe_name)s);
