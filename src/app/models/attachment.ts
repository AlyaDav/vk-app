import {Photo} from "./photo";
import {Link} from "./link";
import {Video} from "./video";
import { Doc } from "./doc";
import { Audio } from "./audio";

export class Attachment{
type: string;
photo?:Photo;
link?:Link;
video?:Video;
doc?:Doc;
photos?:Photo[];
audio?:Audio;
}


