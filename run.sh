#!/bin/bash
clear
echo '##      ## ######## ########          ########  #### ######## ########    ###'
echo '##  ##  ## ##       ##     ##         ##     ##  ##       ##       ##    ## ##'
echo '##  ##  ## ##       ##     ##         ##     ##  ##      ##       ##    ##   ##'
echo '##  ##  ## ######   ########  ####### ########   ##     ##       ##    ##     ##'
echo '##  ##  ## ##       ##     ##         ##         ##    ##       ##     #########'
echo '##  ##  ## ##       ##     ##         ##         ##   ##       ##      ##     ##'
echo ' ###  ###  ######## ########          ##        #### ######## ######## ##     ##'
echo @@@@@@@@@@@@@@@@@@@@
echo SERVER/CLIENT MODULE
echo @@@@@@@@@@@@@@@@@@@@
(cd server && node server.js) &
(cd client && node client.js) &
read -p "Press any key to exit from Web Pizza... "
kill $(ps ax | grep '[n]ode' | awk '{print $1}')
