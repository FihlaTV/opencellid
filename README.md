# Self hosted OpenCellID server

An [OpenCellID](http://www.opencellid.org/) HTTP server, inspired by the original work
from [Frédéric Junod](https://github.com/fredj/opencellid).
You'll want to use this if you either don't want to rely on OpenCellID to stay
online, or when you're a commercial user of OpenCellID.

## Install

Download and create an sqlite database from the csv data that you can get from
http://opencellid.org/downloads/. The thing is that it now requires a login, so
the best way is to download it from browser and store it as cells.txt.gz in this folder.
If you want to run this on a server then use Firefox Network panel and 'copy as cURL'.
Then run that command on the server and store as cells.txt.gz.

Then run:

    cat cells.txt.gz | gunzip - > cells.txt
    cat schema.sql | sqlite3 cells.sqlite
    cat import.sql | sqlite3 cells.sqlite

## Running

Start the server

    npm install
    node opencellid.js

Use environment variables PORT and IP for different port/host. F.e.:

    PORT=1337 node opencellid.js

## Query

    curl -s 'http://localhost:5265/?mcc=228&mnc=1&lac=505&cellid=10545'

The outout is a JSON object that has lat, lon and range.

## License

Released under the [WTFPL version 2](http://sam.zoy.org/wtfpl/).
