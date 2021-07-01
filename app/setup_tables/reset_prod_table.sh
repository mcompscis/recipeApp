#!/bin/bash

python drop_tables.py --table-type "prod";
python create_tables.py --table-type "prod";

