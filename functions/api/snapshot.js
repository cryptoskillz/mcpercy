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

let getBrowserlessSnapshot = async (headlessUrl,cardid,width,height,agentName,URLtoImage,context,corv,device) => {
    console.log('gah')
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
        console.log('gahh')
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

        console.log(`${cardid}-${device}-${corv}`)

        //get the repsonse
        const imageArrayBuffer = await response.arrayBuffer();
        const imageUint8Array = new Uint8Array(imageArrayBuffer);
        //save it to KV
        const KV = context.env.datastore
        const kvId = `${cardid}-${device}-${corv}`;
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
        //get the preview
        const preview = searchParams.get('preview');

    const headlessUrl = `https://chrome.browserless.io/screenshot?token=${context.env.BROWSERLESSTOKEN}`;
    //get the card id 
    const cardid = searchParams.get('cardid');
    //get the control url 
    const controlUrl = searchParams.get('control');
    //get the variant url
    const variantUrl = searchParams.get('variant');
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
    if (device == 2) {
        //add play right later.
        snapShotEngine = 2;
        width = 390;
        height = 884;
        agentName = "Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/114.0.5735.50 Mobile/15E148 Safari/604.1";
    }

    //use browerless
    if (snapShotEngine == 1) {
        //get the control snapshot
        const res1 = await getBrowserlessSnapshot(headlessUrl,cardid,width,height,agentName,controlUrl,context,"control",device);
        //get the variant snapshot
        const res2 = await getBrowserlessSnapshot(headlessUrl,cardid,width,height,agentName,variantUrl,context,"variant",device);
    }
    //playwright
    if (snapShotEngine == 2) {

    }
    const theId = `${cardid}-${device}`;
    //set the comment text
    const commentText = `Your sweet sweet McCpercy comparison will be here!!! ${context.env.APPLICATIONURL}share?id=${theId}`;

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