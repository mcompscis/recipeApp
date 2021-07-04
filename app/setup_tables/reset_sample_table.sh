#!/bin/bash

python drop_indexes.py --table-type "sample"; 
python drop_tables.py --table-type "sample";
python create_tables.py --table-type "sample";
python populate_recipe_tables.py --table-type "sample";
python create_indexes.py --table-type "sample";

