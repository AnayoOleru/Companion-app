#!/usr/bin/env bash

function login(){
    #Increase the max user watches to fix an error with watches
    # i.e Error: ENOSPC: System limit for number of file watchers reached, watch
    echo fs.inotify.max_user_watches=524288 | tee -a /etc/sysctl.conf && sysctl -p
    #Login into the expo account
    expo login -u $EXPO_USERNAME -p $EXPO_PASSWORD
}

login $@
