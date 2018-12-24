export class Photo{
    id: number;
    album_id: number;
    owner_id: number;
    user_id: number;
    text: string;
    data: number;
    
    sizes: [{ 
        src: string;
        width: number, 
        height: number, 
        type: 'm' 
        }]
}