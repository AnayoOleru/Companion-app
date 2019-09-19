#!/usr/bin/env bash

function generateConfigFile(){
    echo 'IOS_CLIENT_ID='$IOS_CLIENT_ID >> .env
    echo 'ANDROID_CLIENT_ID='$ANDROID_CLIENT_ID >> .env
    echo 'ANDELA_AUTH_API='$ANDELA_AUTH_API >> .env
    echo 'TYPE='$TYPE >> .env
    echo 'PROJECT_ID='$PROJECT_ID >> .env
    echo 'PRIVATE_KEY_ID='$PRIVATE_KEY_ID >> .env
    echo 'PRIVATE_KEY='$PRIVATE_KEY >> .env
    echo 'CLIENT_EMAIL='$CLIENT_EMAIL >> .env
    echo 'CLIENT_ID='$CLIENT_ID >> .env
    echo 'AUTH_URI='$AUTH_URI >> .env
    echo 'TOKEN_URI='$TOKEN_URI >> .env
    echo 'AUTH_PROVIDER_X509_CERT_URL='$AUTH_PROVIDER_X509_CERT_URL >> .env
    echo 'CLIENT_X509_CERT_URL='$CLIENT_X509_CERT_URL >> .env
}

generateConfigFile $@
