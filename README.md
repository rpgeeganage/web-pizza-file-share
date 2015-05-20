# ```Web Pizza``` file sharing system
This is similar to Onion Share (https://onionshare.org/). The difference is the file have to stored in a ```remote location ``` where, the particular file is accessible via ```HTTP GET ``` request.
## Installation
##### Web Pizza app
* Install latest ```NodeJS``` (https://nodejs.org/)
* Download the latest build from https://github.com/rpgeeganage/web-pizza-file-share

##### Using app
###### Linux/Ubuntu users
* Execute the script ```run.sh```

###### Windows users
* For Client app, excute ```client.bat```
* For Server app, excute ```server.bat```

##### TOR browser
* Download ```TOR``` from https://www.torproject.org/download/download-easy.html.en
* Set up the Hidden service as mentioned in https://www.torproject.org/docs/tor-hidden-service.html.en or http://www.makeuseof.com/tag/create-hidden-service-tor-site-set-anonymous-website-server/
* Set the hidden service local server as ```127.0.0.1:<port of the server component>```. eg: 127.0.0.1:8483

##### Configuration
The configueration file is located at ```config/config.json```
> Default config file : 
```json
{
  "online_server_port" : "8483", -> Server port
  "client_port" : "9800", -> Client port
  "private_map_file_locket" : "../locket", -> locket folder path
  "tor" :  {
    "enabled" : false, -> Change to true to use TOR for communication
    "port" : "9050" -> TOR SOCKS5 port
  }
}
````

#### Configuration