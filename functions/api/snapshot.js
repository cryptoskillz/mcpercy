let generateGuid = async () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (Math.random() * 16) | 0,
            v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}



//call browersless 
let getBrowserlessSnapshot = async (headlessUrl, cardid, width, height, agentName, URLtoImage, context, controlOrVariant, device) => {
    const jsonData = {
        url: URLtoImage,
        "options": {
            "fullPage": true
        },
        "gotoOptions": {
            "waitUntil": "networkidle2",
        },
        viewport: {
            width: width,
            height: height,
        }
    };
    //make the call
    const response = await fetch(headlessUrl, {
        method: 'POST',
        headers: {
            'Cache-Control': 'no-cache',
            "Content-Type": "application/json",
            'User-Agent': agentName
        },
        body: JSON.stringify(jsonData)
    });

    //get the repsonse
    const imageArrayBuffer = await response.arrayBuffer();
    const imageUint8Array = new Uint8Array(imageArrayBuffer);
    //save it to KV
    const KV = context.env.datastore
    const kvId = `${cardid}-${device}-${controlOrVariant}`;
    await KV.put(kvId, imageUint8Array);

}
export async function onRequestGet(context) {
    //build the paramaters
    const {
        request, // same as existing Worker API
        env, // same as existing Worker API
        params, // if filename includes [id] or [[path]]
        waitUntil, // same as ctx.waitUntil in existing Worker API
        next, // used for middleware or to fetch assets
        data, // arbitrary space for passing data between middlewares
    } = context;

    const { searchParams } = new URL(request.url);
    //why are we doing preview?
    //get the preview
    //const preview = searchParams.get('preview');
    const headlessUrl = `https://chrome.browserless.io/screenshot?token=${context.env.BROWSERLESSTOKEN}`;
    //get the front end
    //1 : trello
    //2 : Shopify
    //3 : html
    const requestor = searchParams.get('requestor');
    let cardid = "";
    if (requestor == 1) {
        //get the card id 
        cardid = searchParams.get('cardid');
    } else {
        //random-string
        cardid = await generateGuid();
    }



    //get the url to snapshop
    const theURL = searchParams.get('url');
    //get the variant url
    const theState = searchParams.get('state');
    //get the device
    //1 = desktop
    //2 = iphone15
    const device = searchParams.get('device');
    //set it to desktop
    //0 = disable
    //1 = browersless
    //2 = playright
    let snapShotEngine = 1;
    let width = 1080;
    let height = 1920;
    let agentName = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36";
    //check id we want to chnage it
    if (device == "iphone") {
        snapShotEngine = 2;
        width = 390;
        height = 884;
        agentName = "Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/114.0.5735.50 Mobile/15E148 Safari/604.1";
    }

    //use browerless
    if (snapShotEngine == 1) {
        //get the control snapshot
        let controlOrVariant = "control"
        if (theState == 2)
            controlOrVariant = "variant"
        const res1 = await getBrowserlessSnapshot(headlessUrl, cardid, width, height, agentName, theURL, context, controlOrVariant, device);
        //get the variant snapshot
        //const res2 = await getBrowserlessSnapshot(headlessUrl, cardid, width, height, agentName, variantUrl, context, "variant", device);
    }
    //playwright
    if (snapShotEngine == 2) {

    }

    if (requestor == 1) {
        //set the comment text
        //check if its a variant 
        if (theState == 2) {
            //se the share URL 
            const shareURL = `${context.env.APPLICATIONURL}share?id=${cardid}-${device}`
            //set he comment
            const commentText = `The ${device} snapshot is ready ${shareURL}`;
            //set the message
            const theUrl = `https://api.trello.com/1/cards/${cardid}/actions/comments?text=${commentText}&key=${context.env.TRELLOKEY}&token=${context.env.TRELLOTOKEN}`
            //make the call
            const response = await fetch(theUrl, {
                method: 'POST',
                headers: {
                    'Cache-Control': 'no-cache',
                    "Content-Type": "application/json",
                }
            });
        }
        return new Response(JSON.stringify("{ok}"), { status: 200 });
    }

    //to do shopify
    if (requestor == 2) {

    }
    //to do plain html 
    if (requestor == 3) {
        return new Response(JSON.stringify(`{url:${shareURL}}`), { status: 200 });
    }

}