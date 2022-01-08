export function status(resp){
    if(resp.status >= 200 && resp.status < 300){
        return resp.json();
    }
    throw new Error(resp.statusText);
}