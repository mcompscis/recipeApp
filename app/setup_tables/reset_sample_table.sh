#!/bin/bash

python drop_tables.py --table-type "sample";
python create_tables.py --table-type "sample";
python populate_sample_tables.py;

