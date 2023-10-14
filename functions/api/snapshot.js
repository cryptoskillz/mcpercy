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
    //get the control, variant url and device type

    //snapshot the control 

    //snapshot the variant

    //store in KV

    //build the return URL
    //note this is a test URL until the above is done.
    const commentText = `check%20out%20this%20sweet%20McPercy%20Image%20https%3A%2F%2Fmcpercy.pages.dev%2Fassets%2Fimages%2Fhoff.jpeg`;
    //set the message
    const theUrl = `https://api.trello.com/1/cards/651ffc5863ec5e0f7aa07bf6/actions/comments?text=${commentText}&key=${context.env.TRELLOKEY}&token=${context.env.TRELLOTOKEN}`
        const response = await fetch(theUrl, {
        method: 'POST',
        headers: {
            'Cache-Control': 'no-cache',
            "Content-Type": "application/json",
        }
    });

    return new Response(JSON.stringify("{ok}"), { status: 200 });

}