# simpleliving

#### install ionic
`$ npm install -g ionic`

#### setup push notification
`$ cordova plugin add phonegap-plugin-push --variable SENDER_ID=11223344 --save`

#### ios simulator
```
$ ionic cordova build ios
$ ionic cordova emulate ios
```

*i got some error- Error: Cannot read property 'replace' of undefined -and was able to fix by running the below and then rerunning the above*
```
$ cd platforms/ios/cordova 
$ npm install ios-sim
```

### Deploy to Iphone
```
$ ionic cordova build ios --prod
```