#!/bin/bash

# TODO: Add populate prod tables Python script
python drop_tables.py --table-type "prod";
python create_tables.py --table-type "prod";
