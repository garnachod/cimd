# cimd
Coding Test for CIMD


### PostgreSQL installation
`docker run --name postgres -p 50432:5432 -e POSTGRES_USER=CimdUser -e POSTGRES_PASSWORD=CimdPassword -e POSTGRES_DB=cimd -d postgres:10`

### Website 'compiling'
* `cd website/static/website/simplecontactmanager`
* `npm install`
* `npm run build`

### Server
* `python3 -m venv venv`
* `source venv/bin/activate`
* `pip install -r requirements.txt`
* `./migrate.sh`
* `./test_api.sh`
* `./local.sh`
