import {Attachment} from "./attachment";
import { Audio } from "./audio";

export class News{
    text: string;
    source_id: number;
    date: number;
    type: string;
    attachments?: Attachment[];
    src?:string[];
    liked:boolean=false;  
    srcAudio?:Audio[];
    group_id?: number;
    group_name?: string;
    group_img?: string;
}