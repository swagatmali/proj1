
function PhoneDialer() {
    this.resultCallback = null; // Function
}
PhoneDialer.prototype.dial = function(phoneNmber){    
    cordova.exec(null, null, "PhoneDialer", "call", [phoneNmber]);
}
PhoneDialer.prototype.email = function(email){
    cordova.exec(null, null, "PhoneDialer", "email", [email]);
}
PhoneDialer.prototype.website = function(website){
    cordova.exec(null, null, "PhoneDialer", "website", [website]);
}
cordova.addConstructor(function()  {    
                       if(!window.plugins)
                       {
                       window.plugins = {};
                       }

                       // shim to work in 1.5 and 1.6
                       if (!window.Cordova) {
                       window.Cordova = cordova;
                       };

                       window.plugins.phoneDialer = new PhoneDialer();
                       });
