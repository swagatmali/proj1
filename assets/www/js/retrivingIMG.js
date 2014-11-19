var DATADIR;
var knownfiles = [];


function onFSSuccess1(fileSystem)
{
    fileSystem.root.getDirectory("Android/data/com.mobantica.proj1/",{create:true,exclusive : false},gotDir,onError);
}
//The directory entry callback
function gotDir(d){
    console.log("got dir");
    alert("d-"+JSON.stringify(d));
    DATADIR = d;
    var reader = DATADIR.createReader();
    reader.readEntries(function(d){
        gotFiles(d);

    },onError);
}
function downloadImges()
{
    var reader = DATADIR.createReader();
    reader.readEntries(gotFiles,onError);
}
var i;
//Result of reading my directory
function gotFiles(entries) {
    alert("The dir has "+entries.length+" entries.");
    if(entries.length == 0)
    {
        appReady(DATADIR);
    }
    else{
        for (var i=0; i<entries.length; i++) {

            entries[i].file(deleteFile, onError);
        }
    }
}
function deleteFile(file) {
    alert("file"+JSON.stringify(file));
        file.remove(success, fail);

}
function success(entry) {
    alert("i"+i);
    console.log("Removal succeeded"+entry);
}
function init1()
{
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFSSuccess, onError);
}
function onFSSuccess(fileSystem)
{
    fileSystem.root.getDirectory("Android/data/com.mobantica.proj1",{create:true,exclusive : false},gotDir,onError);
}
function renderPicture(path){
    $("#slider1").append("<img src='file://"+path+"'>");

    console.log("<img src='file://"+path+"'>");
}

function onError(e){
    console.log("ERROR");
    alert("onError");
    console.log(JSON.stringify(e));
}

function appReady(d){
    alert("aap ready");
    var swa=0;
    $("#status").html("Ready to check remote files...");
    $.get("http://www.raymondcamden.com/demos/2012/jan/17/imagelister.cfc?method=listimages", {}, function(res) {
                $("#status").html("Going to sync some images...");
              for (var i = 0; i < res.length; i++) {
                if (knownfiles.indexOf(res[i]) == -1) {
                    console.log("need to download " + res[i]);
                    var ft = new FileTransfer();
                    var dlPath = DATADIR.fullPath + "/" + res[i];

                    ft.download("http://www.raymondcamden.com/demos/2012/jan/17/" + escape(res[i]), dlPath, function(e){
                        swa++;
                        console.log("temp"+e);
                        if(swa == res.length)
                        {
                            console.log("Successful download");
                            downloadImges();
                        }
                    }, onError);
                }
            }

        $("#status").html("");
    }, "json");

}

function init() {
//    alert("init");
    $("#status").html("Checking your local cache....");
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFSSuccess1, onError);
}
//function deleteImg()
//{
//    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFSSuccess1, onError);
//}