angular.module("config", []).constant("GLOBAL_CONFIGURATION",
{
    application:
    {
        version: "1.0.0-beta.1",
        environment: "dev",
        language: "es",
        home: "app/home/index/"
    },

    //Configurar APNS Push Server , Certificados
    //  https://github.com/argon/node-apn/wiki/Preparing-Certificates


    on_build_new_version: function(newVersion, oldVersion)
    {
        //When has new Version , set the mark in the localstoage 
        localStorage.setItem("$_new_version", 1);
    },

    localstorageStamps:
    {
        personal_data: "$_personal_data",
        configured:  "$_configured",
        new_version: "$_new_version"
    }
});
