SELECT EXISTS (SELECT * FROM Tag WHERE tag_text = %(tag_text)s) AS DoesExist;
