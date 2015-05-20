# ```Web Pizza``` file sharing system
This is similar to Onion Share (https://onionshare.org/). The difference is the file have to stored in a ```remote location ``` where, the particular file is accessible via ```HTTP GET ``` request.
## Installation
##### Web Pizza app
* Install latest ```NodeJS``` (https://nodejs.org/)
* Download the latest build from https://github.com/rpgeeganage/web-pizza-file-share

##### TOR browser
* Download ```TOR``` from https://www.torproject.org/download/download-easy.html.en
* Set up the Hidden service as mentioned in https://www.torproject.org/docs/tor-hidden-service.html.en or http://www.makeuseof.com/tag/create-hidden-service-tor-site-set-anonymous-website-server/
* Set the hidden service local server as ```127.0.0.1:<port of the server component>```. 
> eg: 127.0.0.1:8483


## Using app
###### Linux/Ubuntu users
* Execute the script ```run.sh```

###### Windows users
* For Client app, excute ```client.bat```
* For Server app, excute ```server.bat```

Default Url
* Client default Url : http://localhost:9851
* Server default Url : http://localhost:8483

##### Configuration
The configueration file is located at ```config/config.json```
> Default config file : 

```json
{
  "online_server_port" : "8483",
  "client_port" : "9800",
  "private_map_file_locket" : "../locket",
  "tor" :  {
    "enabled" : false, 
    "port" : "9050" 
  }
}
````

```  "online_server_port" : "8483"``` => Server port

```  "client_port" : "9800"``` => Client port

```  "private_map_file_locket" : "../locket"``` => locket folder path

``` "enabled" : false``` => Change to True to use TOR for remote file download

``` "port" : "9050"``` => TOR SOCKS port
### Locker file
A single locker is create each time.
## ```Important``` Please Store the locker files in a secure place.
##### Locker file format 
Sample locker file.

```json
{
    "pass_code":"61601b25d62f6be89f91ee76a2cf34d6",
    "url_set":[
        "http://filestorage.com/mysecret/my-secret-file-01.pdf",
        "http://filestorage.com/mysecret/my-secret-file-02.pdf"
    ]
}
```

```  "pass_code" : "61601b25d62f6be89f91ee76a2cf34d6"``` => This is the code which used by the receiver

```  "url_set": [...] ``` => URLs of the secret files