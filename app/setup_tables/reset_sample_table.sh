#!/bin/bash

python drop_tables.py;
python create_tables.py;
python populate_recipe_tables.py;

