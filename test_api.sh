#!/usr/bin/env bash
export DATABASE_URL=postgres://CimdUser:CimdPassword@localhost:50432/cimd
python manage.py test api