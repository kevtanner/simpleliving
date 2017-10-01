
#### to easily open xcode from terminal : 
`alias xcode='open -a /Applications/Xcode.app'` then use `xcode platforms/ios/Message\ Drop.xcworkspace'`

#### to easily open sublime from terminal : `alias sublime='open -a /Applications/Sublime\ Text.app/Contents/SharedSupport/bin/subl'`

#### when you change the project name in config.xml 
```
cordova plugin save
cordova platform rm ios
cordova platform add ios
```

#### .cer file into a .pem
`$ openssl x509 -in aps_development.cer -inform der -out CodeMyHackCert.pem`

#### .p12 file into a .pem
`$ openssl pkcs12 -nocerts -in CodeMyHack.p12 -out CodeMyHackKey.pem`