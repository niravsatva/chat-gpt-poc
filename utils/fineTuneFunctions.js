import { createReadStream } from "fs";

export const uploadFile = async (OPENAI_CLIENT,filePath)=>{
    try {
        const f = await OPENAI_CLIENT.createFile(
            createReadStream(filePath,"newdata.jsonl"),
            "fine-tune"
        );
        console.log(`File ID ${f.data.id}`);
        return f.data.id;
    }
    catch (err) {
        console.log('err uploadfile: ', err);
    } 
}

