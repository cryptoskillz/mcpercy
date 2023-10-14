//make the call
/*
    const response = await fetch(headlessUrl, {
        method: 'POST',
        headers: {
            'Cache-Control': 'no-cache',
            "Content-Type": "application/json",
            'User-Agent': snapshotItem.agentName
        },
        body: JSON.stringify(jsonData)
    });
*/

let getBrowserlessSnapshot = async (headlessUrl,cardid,width,height,agentName,URLtoImage) => {
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

        /*
        //get the repsonse
        const imageArrayBuffer = await response.arrayBuffer();
        const imageUint8Array = new Uint8Array(imageArrayBuffer);
        //save it to KV
        const KV = context.env.datastore
        const kvId = `${cardid}`;
        await KV.put(kvId, imageUint8Array);
        */
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

    const headlessUrl = `https://chrome.browserless.io/screenshot?token=${context.env.BROWSERLESSTOKEN}`;
    //get the card id 
    const cardid = "651ffc5863ec5e0f7aa07bf6";
    //get the control url 
    const controlUrl = "";
    //get the variant url
    const variantUrl = "";
    //get the device
    //1 = desktop
    //2 = iphone15
    const device = 1;
    //set it to desktop

    //1 = browersless
    //2 = playright
    let snapShotEngine = 2;
    let width = 1080;
    let height = 1920;
    let agentName = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36";
    //check id we want to chnage it
    if (device == 2) {
        //add play right later.
        //snapShotEngine = 2;
        width = 390;
        height = 884;
        agentName = "Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/114.0.5735.50 Mobile/15E148 Safari/604.1";
    }


    //use browerless
    if (snapShotEngine == 1) {
        //get the control snapshot
        getBrowserlessSnapshot(headlessUrl,cardid,width,height,agentName,controlUrl);
        //get the variant snapshot
        getBrowserlessSnapshot(headlessUrl,cardid,width,height,agentName,variantUrl);
    }
    //playwright
    if (snapShotEngine == 2) {

    }


    const commentText = `Your sweet sweet McCpercy comparison will be here! ${context.env.APPLICATIONURL}share?id=${cardid}`;
    console.log(commentText);    

    //snapshot the variant


    //set the message
    const theUrl = `https://api.trello.com/1/cards/${cardid}/actions/comments?text=${commentText}&key=${context.env.TRELLOKEY}&token=${context.env.TRELLOTOKEN}`
    const response = await fetch(theUrl, {
        method: 'POST',
        headers: {
            'Cache-Control': 'no-cache',
            "Content-Type": "application/json",
        }
    });
    
    return new Response(JSON.stringify("{ok}"), { status: 200 });

}