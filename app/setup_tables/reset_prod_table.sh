#!/bin/bash

# TODO: Add populate prod tables Python script
python drop_indexes.py --table-type "prod";
python drop_tables.py --table-type "prod";
python create_tables.py --table-type "prod";
python create_indexes.py --table-type "prod";

