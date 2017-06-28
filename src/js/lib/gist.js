var pastebin = {
    add: function (text) {

        var request = {
            "description": "Blockly for OC",
            "public": true,
            "files": {
                "data.boc": {
                    "content": text
                }
            }
        };

        var httpReq = new XMLHttpRequest();
        httpReq.open("post", "https://api.github.com/gists", false);
        httpReq.setRequestHeader("content-type", "application/json");
        httpReq.send(JSON.stringify(request));

        var url = JSON.parse(httpReq.responseText).html_url;
        return url.substring(url.lastIndexOf("/")+1);
    },

    get: function (id) {
        var httpReq = new XMLHttpRequest();
        httpReq.open("get", "https://api.github.com/gists/"+id, false);
        httpReq.setRequestHeader("content-type", "application/json");
        httpReq.send();
        var gist = JSON.parse(httpReq.responseText);
        return gist.files["data.boc"].content;
    }

};


