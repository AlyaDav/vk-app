import {Photo} from "./photo";
import {Link} from "./link";
import {Video} from "./video";
import { Doc } from "./doc";

export class Attachment{
type: string;
photo?:Photo;
link?:Link;
video?:Video;
doc?:Doc;
photos?:Photo[];
}


